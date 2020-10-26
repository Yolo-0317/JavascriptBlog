#### ts-migrate: A Tool for Migrating to TypeScript at Scale
#### ts-migrate: 大规模迁移JavaScript到TypeScript工具

TypeScript is the official language of frontend web development at Airbnb. Yet, the process of adopting TypeScript and migrating a mature codebase containing thousands of JavaScript files didn’t happen in one day. TypeScript adoption went through the process of an initial proposal, adoption by multiple teams, a beta phase and, finally, landing as the official language of frontend development at Airbnb. You can learn more about how we adopted TypeScript at scale in this talk by Brie Bunge.
TypeScript是Airbnb前端Web开发的官方语言。但是，采用TypeScript并迁移包含数千个JavaScript文件的成熟代码库的过程不能一蹴而就。TypeScript的采用经历了最初的提议，多个团队的采用，beta阶段，最后成为了Airbnb前端开发的官方语言。  您可以在[Brie Bunge的这次演讲中](https://www.youtube.com/watch?v=P-J9Eg7hJwE)了解有关我们如何大规模采用TypeScript的更多信息。

##### Migration strategies
##### 迁移策略

Migration at scale is a complex task, and we explored a couple of options for moving from JavaScript to TypeScript:
>大规模迁移是一项复杂的任务，我们探索到从JavaScript迁移到TypeScript的两点需要注意的事项：

1. **Hybrid migration strategy.** Partially migrate file by file, fix type errors, and repeat until the full project is migrated. The allowJS config option allows us to have TypeScript and JavaScript files coexist in the project side by side, which makes this approach possible!

>混合迁移策略。已文件为单位进行迁移，修复类型错误，重复操作直到完成整个项目的迁移。allowJS配置选项允许TypeScript和JavaScript文件在我们的项目中并存，使得这一策略可行。

In the hybrid migration strategy, we don’t have to pause development and can gradually migrate file by file. Though, on a large scale, this process might take a long time. Additionally, there will be a need to educate and onboard engineers from different parts of the organization.
>在混合迁移策略中，我们不必暂停开发，而可以逐个文件地逐步迁移。尽管如此，如果需要迁移的项目规模巨大，这一过程将耗费很多时间。另外需要对负责不同部分的工程师进行培训。

2. **All-in migration!** Take a JavaScript or partial TypeScript project and convert it completely. We’ll need to add some any types and @ts-ignorecomments so the project compiles without errors, but over time we can replace them with more descriptive types.
> **完全地迁移！** 对一个JavaScript项目或者部分才有TypeScript的项目进行全面的转换成TS。我们需要添加一些类型和@ ts-ignore的注释，以便项目编译时不会出错，但是随着时间的推移，我们可以将它们替换为更具描述性的类型。

**There are several significant advantages to choosing the all-in migration strategy:**
**选择全面迁移策略有几个明显的优点：**
* **Consistency across a project:** An all-in migration will guarantee that the state of every file is the same, and engineers won’t need to remember where they can use TypeScript features and where the compiler will prevent basic errors.
> **保证整体项目一致：** 全面迁移能够保证每个文件的状态相同，并且工程师不需要记录在哪里使用TS特性或者哪些地方会被因为基本错误编译器组织。
* **Fixing just one type is much easier than fixing the file:** Fixing an entire file can be very complex as files can have multiple dependencies. With a hybrid migration, it’s harder to track the real progress of the migration and the status of files.
> **仅修复一种类型比修复文件容易得多：** 因为一个文件可能存在多个依赖，导致修复文件十分复杂。在混合迁移中，实际的迁移进度和文件状态是很难追踪的。

Looks like all-in migration is the clear winner here! But the process of performing an all-in migration of a large and mature codebase is a weighty and complex problem. To solve this problem, we decided to use code modification scripts — codemods! Through our initial process of manual migration to TypeScript, we recognized repeated operations that could be automated. We made codemods for each of these steps and combined them into the overarching migration pipeline.
> 到此为止，看起来完全的全面迁移策略完胜。但是，对于迁移一个大型成熟代码库来说，这个过程是繁重和复杂的。为了解决这个问题，我们决定使用代码修改脚本-codemods！通过最初的手动迁移到TS的实践，我们意识到一些重复操作是可以实现自动化的。 我们为每个步骤制作了codemods，并将它们组合到总体迁移过程中。

In our experience, there isn’t a 100% guarantee that an automated migration will result in a completely **error-free** project, but we found that the combination of steps outlined below gave us the best results in ultimately migrating to an error-free TypeScript project. We were able to convert projects with more than 50,000 lines of code and 1,000+ files from JavaScript to TypeScript in one day with the use of codemods!
>根据我们的经验，不能百分百保证通过自动迁移将得到完全无错误的项目，但是我们发现将下列的步骤进行组合最终可以达到项目中完全没有错误的效果。通过使用codemods，我们能够在一天之内将包含50,000行代码和1,000多个文件的项目从JS转换为TS。

Based on this pipeline, we created a tool called “ts-migrate”:
>基于此过程，我们创建了一个名为“ ts-migrate”的工具：
<img src="https://github.com/ShadowWalker627/JavascriptBlog/blob/master/BlogAssets/img/ts-migrate1.png" alt="GitHub" title="GitHub,Social Coding" width="50" height="50" />

At Airbnb, we use React for a significant part of our frontend codebase. That’s why some parts of codemods are related to React-based concepts. ts-migrate can potentially be used with other frameworks or libraries with additional configuration and testing.
>在Airbnb，React是前端代码库的重要部分。这就是为什么codemod的某些部分与基于React的概念相关的原因。ts-migrate可以通过其他配置和测试与其他框架或库一起使用。

##### Steps of the migration process
#### 迁移步骤
Let’s walk through the main steps needed to migrate a project from JavaScript to TypeScript and how those steps are implemented:
>让我们逐步完成将项目从JavaScript迁移到TypeScript所需的主要步骤，以及如何实现这些步骤：
1. The first part in every TypeScript project is the creation of a tsconfig.json file, and ts-migrate can do this if required. There’s a default config file template and a validation check that helps us ensure all projects are consistently configured. Here is an example of the base-level config:
> 每个TypeScript项目的第一部分都是创建tsconfig.json文件，并且如果需要，ts-migrate可以执行此操作。它提供了一个默认的配置文件模板和一个验证检查，可帮助我们确保所有项目均得到一致配置。下面是基本级别配置的示例：
```
{
  "extends": "../typescript/tsconfig.base.json",
  "include": [".", "../typescript/types"]
}
```
[base-ts-config.json](https://gist.github.com/Rudeg/bfaea48f44686819734dc374fdfbd325#file-base-ts-config-json)

2. Once the tsconfig.json file is in place, the next step is changing the file extensions of the source code files from .js/.jsx to .ts/.tsx. Automation of this step is pretty easy, and it also removes a good chunk of manual work.
>在项目中添加tsconfig.json文件后，下一步是将源代码文件的文件扩展名从.js / .jsx更改为.ts / .tsx。此步骤的自动化非常容易，并且还消除了很多手工工作。

3. The next step is running codemods! We call them “plugins”. 
Plugins for ts-migrate are codemods that have access to additional information via the TypeScript language server. Plugins take a string as an input and produce an updated string as an output. jscodeshift, the TypeScript API, a string replace, or other AST modification tools can be used to power the code transformation.
>下一步就是运行codemods！我们称它们为“插件”。ts-migrate的插件是可以通过TypeScript语言服务器访问其他信息的codemod。插件将字符串作为输入，并生成更新的字符串作为输出。jscodeshift，TypeScript API，字符串替换或其他AST修改工具都可用于代码转换。

After each of these steps, we check if there are any pending changes in Git history and commit them. This helps split migration pull requests into commits that are easier to understand and also tracks file renames.
>完成上述每个步骤后，我们将检查Git历史记录中是否有任何待处理的更改并提交。这有助于将迁移请求请求拆分为更易于理解的提交，并且还可以跟踪文件重命名。

##### ts-migrate软件包概述
We split ts-migrate into 3 packages:
* ts-migrate
* ts-migrate-server
* ts-migrate-plugins
>我们将ts-migrate分为3个软件包：
>* ts-migrate
>* ts-migrate-server
>* ts-migrate-plugins

By doing so, we were able to separate the transformation logic from the core runner and create multiple configs for different purposes. Currently, we have two main configs: migration and reignore.
>通过这样做，我们能够将转换逻辑与核心运行程序分离，并创建用于不同目的的多个配置。当前，我们有两个主要配置：迁移和忽略。

While the goal of the migration config is to migrate from JavaScript to TypeScript, the purpose of reignore is to make the project compilable by simply ignoring all the errors. Reignore is useful when one has a large codebase and is performing tasks like:
* upgrading the TypeScript version
* making major changes or refactorings to the codebase
* improving types of some commonly used libraries
>迁移配置的目标是从JavaScript迁移到TypeScript，而忽略的目的是通过简单地忽略所有错误来使项目可编译。当一个人的代码库很大并且正在执行以下任务时，忽略(Reignore)就非常有用：
>* 升级TypeScript版本
>* 对代码库进行重大更改或重构
>* 改进一些常用库的类型

This way, we can migrate a project even if there are some errors we don’t want to deal with immediately. It makes the update of TypeScript or libraries a lot easier.
>这样，即使有一些我们不想立即处理的错误，我们也可以迁移项目。 它使TypeScript或库的更新变得容易得多。

Both configs run on the ts-migrate-server, which consists of two parts:
>这两个配置都在**ts-migrate-server**上运行，该服务由两部分组成：
* [TSServer](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-server/src/forkTSServer.ts): This part is very similar to what VSCode editor does for the communication between the editor and a language server. A new instance of the TypeScript language server runs as a separate process, and development tools communicate with the server using the [language protocol](https://microsoft.github.io/language-server-protocol/).
> TSServer：这部分与VSCode编辑器在编辑器和语言服务之间的通信非常相似。TypeScript语言服务器的新实例作为单独的进程运行，并且开发工具使用语言协议与服务进行通信。

* [Migration runner:](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-server/src/migrate/index.ts#L16) This piece runs and coordinates the migration process. It expects the following parameters:
> Migration runner：这一部分运行并协调了迁移过程。 它需要以下参数：
```js
interface MigrateParams {
  rootDir: string;          // path to the root directory  
  config: MigrateConfig;    // migration config, including list of       
                            // plugins it contains
  server: TSServer;         // an instance of the TSServer fork
}
```
And it performs the following actions:
它执行以下操作：
1. [Parse tsconfig.json](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-server/src/migrate/index.ts#L19)
2. [Create .ts source files](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-server/src/migrate/index.ts#L54)
3. [Send each file](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-server/src/migrate/index.ts#L103) to the TypeScript language server for diagnostics. There are three types of diagnostics that the compiler provides for us: **semanticDiagnostics**, **syntacticDiagnostics**, and **suggestionDiagnostics**. We use these diagnostics to find problematic places in the source code. Based on the unique diagnostic code and the line number, we can identify the potential type of the problem and apply necessary code modifications.
4. [Run](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-server/src/migrate/index.ts#L135) all plugins on each file. If the text changes due to the plugin execution, we [update the contents of the original](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-server/src/migrate/index.ts#L147) file and notify the TypeScript language server that the file has changed.
>1. 解析tsconfig.json
>2. 创建 .ts 源文件
>3. 将每个文件发送到TypeScript语言服务进行诊断。编译器为我们提供的诊断有三种：语义诊断，语法诊断和建议诊断。我们使用这些诊断程序查找源代码中的问题。根据唯一的诊断代码和行号，我们可以确定问题的潜在类型并进行必要的代码修改。
>4. 在每个文件上运行所有插件。

You can find examples of the ts-migrate-server usage in the examples package or the main package. ts-migrate-example also contains basic examples of plugins. They fit into 3 main categories:
* jscodeshift-based
* TypeScript Abstract Syntax Tree (AST)-based
* text-based
>您可以在示例包或主包中找到ts-migrate-server用法的示例。ts-migrate-example还包含插件的基本示例。 主要包括3类：
>* jscodeshift-based
>* TypeScript Abstract Syntax Tree (AST)-based
>* text-based

There is a set of examples in the repository to demonstrate how to build simple plugins of all kinds and use them in combination with the ts-migrate-server. Here is an example [migration pipeline](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-example/src/index.ts#L18) that transforms the following code:
>代码仓库中有一组示例，以演示如何构建各种简单的插件并将其与ts-migrate-server结合使用。这是一个示例迁移管道，用于转换以下代码：
```js
function mult(first, second) {
  return first * second;
}

//into

function tlum(tsrif: number, dnoces: number): number {
  console.log(`args: ${arguments}`);
  return tsrif * dnoces;
}
```
[ts-migrate-example-output.ts](https://gist.github.com/Rudeg/e3278eb36e0f4567a8bf3bbe6fdda1a5#file-ts-migrate-example-input-js)

ts-migrate did 3 transformations in the example above:
1.reversed all identifiers first -> tsrif
2. added types to the function declaration function tlum(tsrif, dnoces) -> function tlum(tsrif: number, dnoces: number): number
3. inserted console.log(‘args:${arguments}’);
>ts-migrate在上面的示例中进行了3次转换：
>1.反转所有标识符 first -> tsrif
>2. 将类型添加到函数声明中 function tlum(tsrif, dnoces) -> function tlum(tsrif: number, dnoces: number): number
>3. 插入 console.log(‘args:${arguments}’);

##### Generic plugins
##### 通用插件
The real-world plugins are located in a separate package — ts-migrate-plugins. Let’s take a look at some of them. We have two jscodeshift-based plugins: explicitAnyPlugin and declareMissingClassPropertiesPlugin. jscodeshift is a tool that can convert the AST back to string using the recast packageBy using the function toSource(), we can directly update source code for our files.
>实际的插件位于单独的软件包中-ts-migrate-plugins。 让我们来看看其中的一些。我们有两个基于jscodeshift的插件：explicitAnyPlugin和clarifyMissingClassPropertiesPlugin。jscodeshift是一个可以使用重铸包将AST转换回字符串的工具，通过使用toSource（）函数，我们可以直接更新文件的源代码。

The main idea behind explicitAnyPlugin lies in extracting all semanticDiagnostics errors from the TypeScript language server along with line numbers. We will then need to add any type on the lines specified in the diagnostics. This approach allows us to resolve errors, since adding an any type fixes compilation errors.
>explicitAnyPlugin背后的主要思想是从TypeScript语言服务器中提取所有的语义诊断错误以及行号。然后，我们需要在诊断中指定的行上添加any类型。  这种方法使我们能够解决错误，因为添加any类型都可以解决编译错误。
```js
//Before:
const fn2 = function(p3, p4) {}
const var1 = [];

//After:
const fn2 = function(p3: any, p4: any) {}
const var1: any = [];
```
declareMissingClassPropertiesPlugin takes all diagnostics with code 2339 (can you guess what this code means?) and if it can find class declaration with missing identifiers, the plugin will add them to the class body with any type annotation. As one may be able to tell by the name, this codemod is only applicable for ES6 classes.
> defineMissingClassPropertiesPlugin使用代码2339进行所有诊断（您能猜出这是什么意思吗？），如果可以找到缺少标识符的类声明，插件将使用any类型注释将它们添加到类主体中。正如名称所显示的那样，此codemod仅适用于ES6类。

The next category of plugins is TypeScript AST-based plugins. By parsing the AST, we can generate an array of updates in the source file with the following types:
> 下一类插件是基于TypeScript AST的插件。  通过解析AST，我们可以在源文件中生成具有以下类型的更新数组：
```js
type Insert = { kind: 'insert'; index: number; text: string };
type Replace = { kind: 'replace'; index: number; length: number; text: string };
type Delete = { kind: 'delete'; index: number; length: number };
```

After the updates are generated, the only thing left is to apply the changes in reverse order. If, through the result of these operations, we receive new text, we update the source file. Let’s take a look at a couple of these AST-based plugins: stripTSIgnorePlugin and hoistClassStaticsPlugin.
> 生成更新后，剩下的唯一事情就是以相反的顺序应用更改。如果通过这些操作的结果，我们收到新的文本，我们将更新源文件。让我们看一下几个基于AST的插件：stripTSIgnorePlugin和hoistClassStaticsPlugin。

[stripTSIgnorePlugin](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-plugins/src/plugins/strip-ts-ignore.ts) is the first plugin in the migration pipeline. It removes all @ts-ignore¹ instances from the file. If we are converting a JavaScript project to TypeScript, this plugin won’t do anything. However, if it is a partial TypeScript project (at Airbnb, we had several projects in this state), this is an essential first step. Only after removing @ts-ignore comments will the TypeScript compiler emit all diagnostic errors that need to be addressed.
> stripTSIgnorePlugin是迁移过程中的第一个插件。它将从文件中删除所有@ts-ignore注释。如果我们将JavaScript项目转换为TypeScript，则此插件将无法执行任何操作。但是，如果这是部分为TypeScript的项目（在Airbnb，有多个项目处于该状态），则这是必不可少的第一步。只有删除@ ts-ignore注释后，TypeScript编译器才会发出所有需要解决的诊断错误。

```js
const str3 = foo
  ? // @ts-ignore
    // @ts-ignore comment
    bar
  : baz;
// transforms into:
const str3 = foo
  ? bar
  : baz;
```
After removing @ts-ignore comments we run the [hoistClassStaticsPlugin](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-plugins/src/plugins/hoist-class-statics.ts). This plugin goes through all class declarations in the file. It determines whether we can hoist identifiers or expressions and determines whether an assignment has already been hoisted to a class.
>删除@ ts-ignore注释后，我们运行hoistClassStaticsPlugin。该插件将遍历文件中的所有类声明。它确定我们是否可以提升标识符或表达式，并确定是否已将声明提升到一个类。

To be able to iterate quickly and prevent regressions, we added a series of unit tests for each plugin and ts-migrate.
>为了能够快速迭代并防止回退，我们为每个插件和ts-migrate添加了一系列单元测试。

##### React-related plugins
##### React相关插件
[reactPropsPlugin](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-plugins/src/plugins/react-default-props.ts) converts the type information from PropTypes to a TypeScript props type definition. It’s based on the awesome tool written by Mohsen Azimi. We need to run this plugin only on .tsx files that contain at least one React component. reactPropsPlugin looks for all PropTypes declarations and tries to parse them by using AST and simple regular expressions like /number/ or more complex cases like /objectOf$/. When a React component (either functional or class) is detected, it gets transformed into a component with a new type for props: type Props = {…};.
> reactPropsPlugin将类型信息从PropTypes转换为TypeScript props类型定义。它是基于Mohsen Azimi编写的出色工具。我们只能在包含至少一个React组件的.tsx文件上运行此插件。reactPropsPlugin查找所有PropTypes声明，并尝试使用AST和简单的正则表达式（例如/ number /）或更复杂的情况（例如/ objectOf $ /）来解析它们。当检测到一个React组件（功能类或类）时，它会被转换为具有props新类型的组件：Props = {…};类型。

[reactDefaultPropsPlugin](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-plugins/src/plugins/react-default-props.ts) covers the defaultProps pattern for React components. We use a special type that represents the props with default values:
>reactDefaultPropsPlugin涵盖了React组件的defaultProps模式。我们提供了一种特殊的类型，用以表示包含默认值的props
```js
type Defined<T> = T extends undefined ? never : T;
type WithDefaultProps<P, DP extends Partial<P>> = Omit<P, keyof DP> & {
  [K in Extract<keyof DP, keyof P>]:
    DP[K] extends Defined<P[K]>
      ? Defined<P[K]>
      : Defined<P[K]> | DP[K];
};
```
We attempt to find default props declarations and merge them with the component props type, which was generated by the previous step.
>我们尝试查找默认的props声明，并将它们与上一步生成的component props类型合并。

[Concepts of state and lifecycle](https://reactjs.org/docs/state-and-lifecycle.html) are pretty common in the React ecosystem. We addressed them in two plugins. If a component is stateful, the [reactClassStatePlugin](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-plugins/src/plugins/react-class-state.ts) generates a new type State = any; and the [reactClassLifecycleMethodsPlugin](https://github.com/airbnb/ts-migrate/blob/e163ea39a8bd62105773625236f9b4098883c4f3/packages/ts-migrate-plugins/src/plugins/react-class-lifecycle-methods.ts) annotates component lifecycle methods with proper types. The functionality of these plugins can be extended including the ability to replace any with more descriptive types.
>状态和生命周期的概念在React生态系统中非常普遍。我们通过两个插件解决了它们。如果组件是有状态的，则reactClassStatePlugin会生成一个新的类型State = any;而reactClassLifecycleMethodsPlugin用适当的类型注释组件生命周期方法。这些插件的功能可以扩展，包括用更具描述性的类型替换any类型。 

There is room for more improvements and better type support for state and props. However, as a starting point, this functionality proved to be sufficient. We also don’t cover hooks, since at the beginning of the migration our codebase used an older version of React.
>有更多的改进空间，以及对state和props的更好类型支持。但是，作为起点，此功能已足够。我们也没有支持React hooks，因为在迁移开始时，代码库使用了较旧的React版本。

##### Ensuring successful project compilation
##### 确保项目成功编译

Our goal is to get a compiling TypeScript project with basic type coverage that does not result in an application runtime behavior change.
> 我们的目标是获得一个具有基本类型覆盖的TS项目，且不会改变应用程序运行时的表现。

Following all transformations and code modifications, our code may have inconsistent formatting and some lint checks may fail. Our frontend codebase relies on a prettier-eslint setup — Prettier is used to autoformat code and ESLint ensures that the code follows best practices. So we can quickly fix any formatting issues the previous steps may have introduced by running eslint-prettier from our plugin.
> 完成所有转换和代码修改后，我们的代码可能格式不一致，并且某些lint检查可能会失败。我们的前端代码库依赖于prettier-eslint设置。Prettier用于自动格式化代码，ESLint确保代码遵循最佳实践。因此，我们可以通过在插件中运行eslint-prettier来快速解决先前步骤可能引入的所有格式问题。

The last piece of the migration pipeline ensures that all TypeScript compilation violations are addressed. To detect and fix potential errors, tsIgnorePlugin takes semantic diagnostics with line numbers and inserts @ts-ignore comments with a useful explanation, such as:
> 迁移过程的最后一部分是确保解决所有TypeScript编译冲突。为了检测和修复潜在的错误，tsIgnorePlugin使用行号进行语义诊断，并插入带有详细解释的@ ts-ignore注释，例如：
```js
// @ts-ignore ts-migrate(7053) FIXME: No index signature with a parameter of type 'string...
const { field1, field2, field3 } = DATA[prop];
// @ts-ignore ts-migrate(2532) FIXME: Object is possibly 'undefined'.
const field2 = object.some_property;
```

We added support for JSX syntax as well:
>我们还添加了对JSX语法的支持：
```js
{*
// @ts-ignore ts-migrate(2339) FIXME: Property 'NORMAL' does not exist on type 'typeof W... */}
<Text weight={WEIGHT.NORMAL}>
  some text
</Text>
<input
  id="input"
  // @ts-ignore ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'string'.
  name={getName()}
/>
```
Having meaningful error messages in comments makes it easier to fix issues and revisit code that needs attention. These comments, in combination with $TSFixMe², allow us to collect useful data about code quality and identify potentially problematic areas of code.
>在注释中显示有意义的错误消息，可以更轻松地解决问题并重新访问需要注意的代码。这些注释与$TSFixMe²结合使用，使我们可以收集有关代码质量的有用数据，并确定可能存在问题的代码区域。

Last but not least, we need to run the eslint-fix plugin twice. Once before the tsIgnorePlugin given formatting may affect where we will get compiler errors. And again after the tsIgnorePlugin, since inserting @ts-ignore comments may introduce new formatting errors.
> 最后但并非不重要的是，我们需要运行eslint-fix插件两次。在tsIgnorePlugin之前，给定的格式可能会影响我们在哪里将获得编译器错误。在tsIgnorePlugin之后，由于插入@ ts-ignore注释可能会引入新的格式错误。

##### Summary
##### 总结
Our migration story is a work in progress: we have some legacy projects that are still in JavaScript and we still have a good number of $TSFixMe and @ts-ignore comments in our codebase.
> 我们的迁移story正在进行中，我们有一些仍在JavaScript中的旧项目，并且在我们的代码库中仍然有很多$ TSFixMe和@ ts-ignore注释。

However using ts-migrate dramatically accelerated our migration process and productivity. Engineers were able to focus on typing improvements instead of doing manual file-by-file migration. At this time, ~86% of our 6M-line frontend monorepo has been converted to TypeScript and we’re on track for 95% by the end of the year.
> 但是，使用ts-migrate大大加快了我们的迁移过程和生产力。 工程师能够专注于类型改进，而不是手动进行逐文件迁移。目前，我们约有86％的6M-line前端monorepo已转换为TypeScript，到今年年底，我们有望达到95％。

You can check out ts-migrate and find instructions on how to install and run ts-migrate in the main package on the Github repository. If you find any issues or have ideas for improvements, we welcome your contributions!
> 您可以在Github存储库的主软件包中检出ts-migrate，并找到有关如何安装和运行ts-migrate的说明。如果您发现任何问题或有改进的想法，我们欢迎您的贡献！