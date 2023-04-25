; ModuleID = 'probe6.60b33b05-cgu.0'
source_filename = "probe6.60b33b05-cgu.0"
target datalayout = "e-m:e-p:32:32-p10:8:8-p20:8:8-i64:64-n32:64-S128-ni:1:10:20"
target triple = "wasm32-unknown-unknown"

@alloc_607ef4289133e0777b4691f54d1a4662 = private unnamed_addr constant <{ [75 x i8] }> <{ [75 x i8] c"/rustc/5cdb7886a5ece816864fab177f0c266ad4dd5358/library/core/src/num/mod.rs" }>, align 1
@alloc_409aafcb91672de585488f4fdac6764c = private unnamed_addr constant <{ ptr, [12 x i8] }> <{ ptr @alloc_607ef4289133e0777b4691f54d1a4662, [12 x i8] c"K\00\00\00/\04\00\00\05\00\00\00" }>, align 4
@str.0 = internal constant [25 x i8] c"attempt to divide by zero"

; probe6::probe
; Function Attrs: nounwind
define hidden void @_ZN6probe65probe17hdb939c4afbda9d4dE() unnamed_addr #0 {
start:
  %0 = call i1 @llvm.expect.i1(i1 false, i1 false)
  br i1 %0, label %panic.i, label %"_ZN4core3num21_$LT$impl$u20$u32$GT$10div_euclid17h29eb8ffc8edcba23E.exit"

panic.i:                                          ; preds = %start
; call core::panicking::panic
  call void @_ZN4core9panicking5panic17h7551aaf292c923c5E(ptr align 1 @str.0, i32 25, ptr align 4 @alloc_409aafcb91672de585488f4fdac6764c) #3
  unreachable

"_ZN4core3num21_$LT$impl$u20$u32$GT$10div_euclid17h29eb8ffc8edcba23E.exit": ; preds = %start
  ret void
}

; Function Attrs: nocallback nofree nosync nounwind willreturn memory(none)
declare hidden i1 @llvm.expect.i1(i1, i1) #1

; core::panicking::panic
; Function Attrs: cold noinline noreturn nounwind
declare dso_local void @_ZN4core9panicking5panic17h7551aaf292c923c5E(ptr align 1, i32, ptr align 4) unnamed_addr #2

attributes #0 = { nounwind "target-cpu"="generic" "target-features"="+atomics,+bulk-memory,+mutable-globals" }
attributes #1 = { nocallback nofree nosync nounwind willreturn memory(none) }
attributes #2 = { cold noinline noreturn nounwind "target-cpu"="generic" "target-features"="+atomics,+bulk-memory,+mutable-globals" }
attributes #3 = { noreturn nounwind }
