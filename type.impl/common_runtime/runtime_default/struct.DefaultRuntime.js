(function() {
    var type_impls = Object.fromEntries([["common_runtime",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-DefaultRuntime\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#25\">source</a><a href=\"#impl-Clone-for-DefaultRuntime\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for <a class=\"struct\" href=\"common_runtime/runtime_default/struct.DefaultRuntime.html\" title=\"struct common_runtime::runtime_default::DefaultRuntime\">DefaultRuntime</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#25\">source</a><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; <a class=\"struct\" href=\"common_runtime/runtime_default/struct.DefaultRuntime.html\" title=\"struct common_runtime::runtime_default::DefaultRuntime\">DefaultRuntime</a></h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/clone.rs.html#174\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: &amp;Self)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","common_runtime::runtime::Runtime"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-DefaultRuntime\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#25\">source</a><a href=\"#impl-Debug-for-DefaultRuntime\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"common_runtime/runtime_default/struct.DefaultRuntime.html\" title=\"struct common_runtime::runtime_default::DefaultRuntime\">DefaultRuntime</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#25\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/nightly/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","common_runtime::runtime::Runtime"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-DefaultRuntime\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#33-41\">source</a><a href=\"#impl-DefaultRuntime\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"struct\" href=\"common_runtime/runtime_default/struct.DefaultRuntime.html\" title=\"struct common_runtime::runtime_default::DefaultRuntime\">DefaultRuntime</a></h3></section></summary><div class=\"impl-items\"><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#34-40\">source</a><h4 class=\"code-header\">pub(crate) fn <a href=\"common_runtime/runtime_default/struct.DefaultRuntime.html#tymethod.new\" class=\"fn\">new</a>(name: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a>, handle: Handle, dropper: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/sync/struct.Arc.html\" title=\"struct alloc::sync::Arc\">Arc</a>&lt;<a class=\"struct\" href=\"common_runtime/runtime/struct.Dropper.html\" title=\"struct common_runtime::runtime::Dropper\">Dropper</a>&gt;) -&gt; Self</h4></section></div></details>",0,"common_runtime::runtime::Runtime"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-RuntimeTrait-for-DefaultRuntime\" class=\"impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#43-77\">source</a><a href=\"#impl-RuntimeTrait-for-DefaultRuntime\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"common_runtime/runtime/trait.RuntimeTrait.html\" title=\"trait common_runtime::runtime::RuntimeTrait\">RuntimeTrait</a> for <a class=\"struct\" href=\"common_runtime/runtime_default/struct.DefaultRuntime.html\" title=\"struct common_runtime::runtime_default::DefaultRuntime\">DefaultRuntime</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.spawn\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#51-57\">source</a><a href=\"#method.spawn\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"common_runtime/runtime/trait.RuntimeTrait.html#tymethod.spawn\" class=\"fn\">spawn</a>&lt;F&gt;(&amp;self, future: F) -&gt; <a class=\"struct\" href=\"common_runtime/struct.JoinHandle.html\" title=\"struct common_runtime::JoinHandle\">JoinHandle</a>&lt;F::<a class=\"associatedtype\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html#associatedtype.Output\" title=\"type core::future::future::Future::Output\">Output</a>&gt; <a href=\"#\" class=\"tooltip\" data-notable-ty=\"JoinHandle&lt;F::Output&gt;\">ⓘ</a><div class=\"where\">where\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,\n    F::<a class=\"associatedtype\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html#associatedtype.Output\" title=\"type core::future::future::Future::Output\">Output</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,</div></h4></section></summary><div class=\"docblock\"><p>Spawn a future and execute it in this thread pool</p>\n<p>Similar to tokio::runtime::Runtime::spawn()</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.spawn_blocking\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#61-67\">source</a><a href=\"#method.spawn_blocking\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"common_runtime/runtime/trait.RuntimeTrait.html#tymethod.spawn_blocking\" class=\"fn\">spawn_blocking</a>&lt;F, R&gt;(&amp;self, func: F) -&gt; <a class=\"struct\" href=\"common_runtime/struct.JoinHandle.html\" title=\"struct common_runtime::JoinHandle\">JoinHandle</a>&lt;R&gt; <a href=\"#\" class=\"tooltip\" data-notable-ty=\"JoinHandle&lt;R&gt;\">ⓘ</a><div class=\"where\">where\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>() -&gt; R + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,\n    R: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,</div></h4></section></summary><div class=\"docblock\"><p>Run the provided function on an executor dedicated to blocking\noperations.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.block_on\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#70-72\">source</a><a href=\"#method.block_on\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"common_runtime/runtime/trait.RuntimeTrait.html#tymethod.block_on\" class=\"fn\">block_on</a>&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&gt;(&amp;self, future: F) -&gt; F::<a class=\"associatedtype\" href=\"https://doc.rust-lang.org/nightly/core/future/future/trait.Future.html#associatedtype.Output\" title=\"type core::future::future::Future::Output\">Output</a></h4></section></summary><div class=\"docblock\"><p>Run a future to complete, this is the runtime’s entry point</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.builder\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#44-46\">source</a><a href=\"#method.builder\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"common_runtime/runtime/trait.RuntimeTrait.html#method.builder\" class=\"fn\">builder</a>() -&gt; <a class=\"struct\" href=\"common_runtime/runtime/struct.Builder.html\" title=\"struct common_runtime::runtime::Builder\">Builder</a></h4></section></summary><div class='docblock'>Get a runtime builder</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.name\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/common_runtime/runtime_default.rs.html#74-76\">source</a><a href=\"#method.name\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"common_runtime/runtime/trait.RuntimeTrait.html#tymethod.name\" class=\"fn\">name</a>(&amp;self) -&gt; &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a></h4></section></summary><div class='docblock'>Get the name of the runtime</div></details></div></details>","RuntimeTrait","common_runtime::runtime::Runtime"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[11133]}