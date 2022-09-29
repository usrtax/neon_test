use neon::prelude::*;
use neon::types::buffer::TypedArray;

fn u64_bin(mut cx: FunctionContext) -> JsResult<JsBuffer> {
    let x = cx.argument::<JsNumber>(0)?.value(&mut cx) as u64;
    Ok(JsBuffer::external(&mut cx, x.to_le_bytes()))
}

fn bin_u64(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let x = cx.argument::<JsBuffer>(0)?;
    let x = x.as_slice(&mut cx);
    let x = u64::from_le_bytes(x.try_into().unwrap()) as f64;
    Ok(cx.number(x))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("u64Bin", u64_bin)?;
    cx.export_function("binU64", bin_u64)?;
    Ok(())
}
