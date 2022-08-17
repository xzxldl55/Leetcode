# VueUse Learn

## State 状态相关hook

### 1. createGlobalState 可跨实例复用的全局状态

#### Type

```TS

// 接收一个state构造函数（一般都是接收一个() => useStorage()）
export declare function createGlobalState<T>(
  stateFactory: () => T
): CreateGlobalStateReturn<T> // 返回stateFactory函数的执行结果 T
```


#### Usage

```TS
// Store.ts
import { createGlobalState, useStorage } from '@vueuse/core'
import { ref } from 'vue'

export const useGlobalState = createGlobalState(
    () => ref(1)
)

// component1.vue
import { useGlobalState } from 'Store'

const state1 = useGlobalState()

window.s1 = state1

// component2.vue
import { useGlobalState } from 'Store'

const state2 = useGlobalState()

window.s2 = state2


// 说明：此时state1的变化也会相应到state2中，即该状态为全局响应性的指向同一个实例（window.s1 === window.s2）
window.s1.value = 2

window.s2.value // ==> 2
```

### 2. createInjectionState 创建可注入管理的全局状态

> 1. 在父级provide注入后，子级中的所有对应useState同步实例

> 2. 组件只有在其父级（父/祖父/...）调用了provide注入后，才能狗调用useState获取实例

#### Type

```TS
export declare function createInjectionState<
  Arguments extends Array<any>,
  Return
>(
  composable: (...args: Arguments) => Return
): readonly [
  useProvidingState: (...args: Arguments) => void, // 注入函数，在父级调用后即调用输入参数 composable 构建状态实例，后续子节点内useInjectedState公用该实例
  useInjectedState: () => Return | undefined
]
```

#### Usage

```TS
// useCounterStore.ts
import { computed, ref } from 'vue-demi'
import { createInjectionState } from '@vueuse/shared'

const [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {
  // state
  const count = ref(initialValue)

  // getters
  const double = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  return { count, double, increment }
})

export {
    useProvideCounterStore,
    useCounterStore,
}

// RootComponent.vue
<script>
import { useProvideCounterStore } from 'useCounterStore'
import child1 from 'child1'
import child2 from 'child2'

useProvideCounterStore(20)  
</script>

<template>
    <div>
        <child1 />
        <child2 />
    </div>
</template>

// child1.vue
<script>
import { useCounterStore } from 'useCounterStore'

const { count, double, increment } = useCounterStore()
</script>
<template>
    count: {{ count }}
    double: {{ double }}
    <button @click="increment">+</button>
</template>

// child2.vue
<script>
import { useCounterStore } from 'useCounterStore'

const { count, double, increment } = useCounterStore()
</script>
<template>
    count: {{ count }}
    double: {{ double }}
    <button @click="increment">+</button>
</template>

// 说明：根本上child1的实例 (count, double) 与child2的为同一个，child1进行 + ，与child2进行 + 都会影响到对方

// 而在此创建RootComponent，进行了新的Provide，两个Root之间内部的useCountState是隔离的互不影响（分别进行了各自的provide生成两份不同实例）
```

### 3. createSharedComposable 与 createGlobalState 类似，但其接收参数为一个composable function，返回一个共享的该composable function

**这里主要比直接用 composable fn 更优点在于，调用createSharedComposable后，我们在多处使用的 composable fn 仅会被实例化一次，可以节约不必要的空间开销，如下面usage，多处使用useMouse，如果没有createSharedComposable，则会创建多个useMouse实例，多次对document.body进行鼠标移动事件监听，造成不必要的性能消耗。**

#### Type

```TS
export declare function createSharedComposable<
  Fn extends (...args: any[]) => any
>(composable: Fn): Fn // 返回传入的 Fn 实例本身（这点与createGlobalState不同）
```

#### Usage

```TS
// Store
import { createSharedComposable, useMouse } from '@vueuse/core'

export const useSharedMouse = createSharedComposable(useMouse)

// component1
import { useSharedMouse } from 'Store'

const mouse1 = useSharedMouse()

// component2
import { useSharedMouse } from 'Store'

const mouse2 = useSharedMouse()

// 说明：上面介绍中说了，该hook最大优势即在于针对多处调用的相通的composable fn，共享其实例，节约性能。故此下面等式成立

mouse1 === mouse2 // true
```

### 4. useAsyncState 异步响应式状态，其主要功能为，将在promise完成后自动将promise结果赋给reactiveState

#### Type

```TS

// 返回值：响应性状态，是否准备好可以执行Promise（与isLoading互反），是否正在Promise Pending，Promise错误时信息，execute重新执行该Promise（类似刷新一下数据之类的）
export interface UseAsyncStateReturn<Data, Shallow extends boolean> {
  state: Shallow extends true ? Ref<Data> : Ref<UnwrapRef<Data>>
  isReady: Ref<boolean>
  isLoading: Ref<boolean>
  error: Ref<unknown>
  execute: (delay?: number, ...args: any[]) => Promise<Data>
}

// 接收参数（可选）
export interface UseAsyncStateOptions<Shallow extends boolean> {
  /**
   * execute Promise的延迟时间，毫秒
   *
   * @default 0
   */
  delay?: number
  /**
   * 在useAsyncState hook调用后立即执行Promise（默认即为true）
   * 也会应用上面设置的delay
   *
   * @default true
   */
  immediate?: boolean
  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void
  /**
   * 在每次 execute Promise 之前，将state重置为我们传入的 initialState
   *
   * 这在多次调用execute函数（例如，刷新数据）时非常有用。设置为false时，当前状态保持不变，直到promise解析为止。
   *
   * @default true
   */
  resetOnExecute?: boolean
  /**
   * Use shallowRef.
   *
   * @default true
   */
  shallow?: Shallow
  /**
   *
   * 将execute Promise的错误直接抛出，内部不做处理
   *
   * @default false
   */
  throwError?: boolean
}

export declare function useAsyncState<Data, Shallow extends boolean = true>(
  promise: Promise<Data> | ((...args: any[]) => Promise<Data>),
  initialState: Data,
  options?: UseAsyncStateOptions<Shallow>
): UseAsyncStateReturn<Data, Shallow>
```

#### Usage

```TS
const { state, isReady, isLoading, error, execute } = useAsyncState(
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(t => t.data),
  { id: null },
)
```

### 5. useRefHistory 记录Ref响应式数据的变化历史，提供 【撤销】【重做】功能

1. `Deep Track`：在跟踪Object/Array等复杂类型时，由于修改属性并不会更改引用，无法直接触发历史提交，这里我们需要传入 `{ deep: true }` 令其深入跟踪 `useRefHistory(state, { deep: true })`

2. `可自定义克隆函数`：useRefHistory内部使用的 `(x) => JSON.parse(JSON.stringify(x))` 来对传入的state进行克隆，这样“直接”的处理会使得对如 Set/Map/Date 等高级类型失真（降级为简单的Object/字符串等）。故此提供了配置项 dump，可让我们自定义一个克隆函数 `useRefHistory(state, { dump: _.cloneDeep })` （引入lodash的克隆函数作为useRefHistory的克隆函数）

3. `Custom parse and serialization`：如果不想使用自定义克隆函数，对数据直接进行克隆的话（history原样照搬传入的targetState），我们还可以自定义 序列化 & 解析 函数，比如，在track一个对象时，我们只希望history存储其 String 化的对象而不是对象本身。使用 dump 设置序列化函数，parse 设置解析函数 `useRefHistory(state, { dump: JSON.stringify, parse: JSON.parse })`

4. `历史记录容量`：默认情况下，我们将保留所有历史记录（无数量限制），直到明确清除它们，可以通过容量选项 capacity 设置要保留的最大历史记录量。`useRefHistory(target, { capacity: 15 })`

5. `History Flush Timing`：与响应式系统相同，在同一个tick中state的多次改变，导致多次trigger同一个effect时，Vue会异步进行flush（exec effect）以此防止重复的副作用执行（故此我们一般在watch中去查看effect执行后的结果）。这里与之类似，我们可以配置history的flush时机，可选择 `'pre' (default), 'post', 'sync'` 三个值：

    - `pre`：默认值，其时机与响应式系统一致，即当我们 同步执行 两个语句 `state.value = 1; state.value = 2` 时，由于异步的flush，我们的history栈中只会有 [{ oldVal: 2 }]。这里如果我们希望在同步的updateState中将这个update记录也记录下来的话，可以使用useRefHistory提供的 commit 函数（By the way，与reactive系统也相同，pre模式下会在DOM更新前flush）

        ```TS
        const r = ref(0)
        const { history, commit } = useRefHistory(r)

        r.value = 1
        commit()

        r.value = 2
        commit()

        console.log(history.value)
        /* [
            { snapshot: 2 },
            { snapshot: 1 }, // 将同步的修改也记录下来了
            { snapshot: 0 },
        ] */
        ```

    - `post`: 与`pre`类似，异步flush，但在DOM更新后进行flush

    - `sync`: 即同步进行 flush。此外，如果我们想将一系列的update整合为一次history，可以使用useRefHistory提供的batch函数，将一组变化整合在一起

        ```TS
        const r = ref({ names: [], version: 1 })
        const { history, batch } = useRefHistory(r, { flush: 'sync' })

        batch(() => {
        r.names.push('Lena')
        r.version++
        })

        console.log(history.value)
        /* [
        { snapshot: { names: [ 'Lena' ], version: 2 },
        { snapshot: { names: [], version: 1 },
        ] */
        ```

#### Type

```TS

// 可选项
export interface UseRefHistoryOptions<Raw, Serialized = Raw>
  extends ConfigurableEventFilter {
  /**
   * 针对复杂类型是否deep监听变化
   *
   * @default false
   */
  deep?: boolean
  /**
   * 缓冲记录的时机，与VueReactive系统的watch相同
   *
   * @default 'pre'
   */
  flush?: "pre" | "post" | "sync"
  /**
   * 最大历史记录限制
   */
  capacity?: number
  /**
   * 在对update记录打快照（历史记录）时是否 clone？ ==> dump: JSON.parse(JSON.stringify(x))
   *
   * @default false
   */
  clone?: boolean | CloneFn<Raw>
  /**
   * 如何对历史记录快照序列化
   */
  dump?: (v: Raw) => Serialized
  /**
   * 如何解析历史记录快照
   */
  parse?: (v: Serialized) => Raw
}

// hook返回值
export interface UseRefHistoryReturn<Raw, Serialized> {
  /**
   * 监听的原对象
   */
  source: Ref<Raw>
  /**
   * 历史记录栈
   */
  history: Ref<UseRefHistoryRecord<Serialized>[]>
  /**
   * 最近一个历史记录点
   */
  last: Ref<UseRefHistoryRecord<Serialized>>
  /**
   * Same as 'history'
   */
  undoStack: Ref<UseRefHistoryRecord<Serialized>[]>
  /**
   * Records array for redo
   */
  redoStack: Ref<UseRefHistoryRecord<Serialized>[]>
  /**
   * A ref representing if the tracking is enabled
   */
  isTracking: Ref<boolean>
  /**
   * A ref representing if undo is possible (non empty undoStack)
   */
  canUndo: Ref<boolean>
  /**
   * A ref representing if redo is possible (non empty redoStack)
   */
  canRedo: Ref<boolean>
  /**
   * Undo changes
   */
  undo(): void
  /**
   * Redo changes
   */
  redo(): void
  /**
   * Clear all the history
   */
  clear(): void
  /**
   * 暂停跟踪变化
   */
  pause(): void
  /**
   * Resume change tracking
   *
   * @param [commit] if true, a history record will be create after resuming
   */
  resume(commit?: boolean): void
  /**
   * 手动提交历史记录
   */
  commit(): void
  /**
   * Reset ref's value with lastest history
   */
  reset(): void
  /**
   * A sugar for auto pause and auto resuming within a function scope
   *
   * @param fn
   */
  batch(fn: (cancel: Fn) => void): void
  /**
   * Clear the data and stop the watch
   */
  dispose(): void
}

export declare function useRefHistory<Raw, Serialized = Raw>(
  source: Ref<Raw>,
  options?: UseRefHistoryOptions<Raw, Serialized>
): UseRefHistoryReturn<Raw, Serialized>

```

#### Usage

```TS
import { ref } from 'vue'
import { useRefHistory } from '@vueuse/core'

const counter = ref(0)
const { history, undo, redo } = useRefHistory(counter)
```

### 6. useDebouncedRefHistory 记录Ref响应式数据的变化历史，with Debounce 防抖

在防抖时间内的多次update，仅记录最后一次update历史

#### Type

```TS
export declare function useDebouncedRefHistory<Raw, Serialized = Raw>(
  source: Ref<Raw>,
  options?: Omit<UseRefHistoryOptions<Raw, Serialized>, "eventFilter"> & {
    debounce?: MaybeComputedRef<number>
  }
): UseRefHistoryReturn<Raw, Serialized>
```

#### Usage

```TS
import { ref } from 'vue'
import { useDebouncedRefHistory } from '@vueuse/core'

const counter = ref(0)
const { history, undo, redo } = useDebouncedRefHistory(counter, { deep: true, debounce: 1000 })
```

### 7. useThrottledRefHistory 记录Ref响应式数据的变化历史，with Throttled 节流

在节流时间内，只记录第一次的变化

#### Type

```TS
export declare type UseThrottledRefHistoryOptions<Raw, Serialized = Raw> = Omit<
  UseRefHistoryOptions<Raw, Serialized>,
  "eventFilter"
> & { // 多了两个参数 throttle ，trailing
  throttle?: MaybeRef<number>
  trailing?: boolean
}
export declare type UseThrottledRefHistoryReturn<
  Raw,
  Serialized = Raw
> = UseRefHistoryReturn<Raw, Serialized>

export declare function useThrottledRefHistory<Raw, Serialized = Raw>(
  source: Ref<Raw>,
  options?: UseThrottledRefHistoryOptions<Raw, Serialized>
): UseThrottledRefHistoryReturn<Raw, Serialized>
```

#### Usage

```TS
import { ref } from 'vue'
import { useThrottledRefHistory } from '@vueuse/core'

const counter = ref(0)
const { history, undo, redo } = useThrottledRefHistory(counter, { deep: true, throttle: 1000 })
```

### 8. useLastChanged 记录上一次数据变化的时间戳

PS：更新为异步的，需要在nextTick中获取最新的 useLastChanged 得到的数据

#### Type

```TS

```
