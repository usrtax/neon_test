use neon::prelude::*;
use neon::types::buffer::TypedArray;

fn u64_bin(mut cx: FunctionContext) -> JsResult<JsUint8Array> {
    let x = cx.argument::<JsNumber>(0)?.value(&mut cx) as u64;
    Ok(JsUint8Array::from_slice(&mut cx, &x.to_le_bytes())?)
}

fn bin_u64(mut cx: FunctionContext) -> JsResult<JsValue> {
    let x = cx.argument::<JsUint8Array>(0)?;
    let x = x.as_slice(&mut cx);
    Ok(if x.len() == 8 {
        let x = u64::from_le_bytes(x.try_into().unwrap()) as f64;
        cx.number(x).as_value(&mut cx)
    } else {
        cx.undefined().as_value(&mut cx)
    })
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("u64Bin", u64_bin)?;
    cx.export_function("binU64", bin_u64)?;
    Ok(())
}
