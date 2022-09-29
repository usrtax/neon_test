use neon::prelude::*;

fn add(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let x: Handle<JsValue> = cx.argument(0)?;
    let y: Handle<JsValue> = cx.argument(1)?;
    Ok(cx.number((x + y) as i64))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("add", text)?;
    Ok(())
}
