# 插件钩子

## LANGUAGE_INIT

```javascript
cxt.on('LANGUAGE_INIT', ()=>{
    return {
        name: <语言名称>,           //eg. zh-hk
        i18n: <语言配置Map>         //参考语言配置文档说明
        pluginName: <插件名称>         
    }
});

//3个参数必须返回, 否则配置无效
```