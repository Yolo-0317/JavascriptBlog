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