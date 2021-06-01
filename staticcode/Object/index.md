#####检测属性

* key in obj
>检测对象的自有属性或继承属性

* hasOwnProperty
>仅用于检测自有属性，继承属性返回false

* propertyIsEnumerable
>hasOwnProperty的增强版，增加对属性是否可枚举的判断