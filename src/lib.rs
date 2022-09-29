use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    let x = cx.argument::<JsString>(0)?.value(&mut cx);
    let y = cx.argument::<JsString>(1)?.value(&mut cx);

    Ok(cx.string(x + &y))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    Ok(())
}
