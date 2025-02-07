// -------------------- 响应式系统 --------------------
const targetMap = new WeakMap(); // 存储依赖关系
let activeEffect = null;

class Dep {
  constructor() {
    this.subscribers = new Set();
  }
  depend() {
    if (activeEffect) this.subscribers.add(activeEffect);
  }
  notify() {
    this.subscribers.forEach(effect => effect());
  }
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      Reflect.set(target, key, value);
      const dep = getDep(target, key);
      dep.notify();
      return true;
    }
  });
}

function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Dep()));
  return dep;
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

// -------------------- 虚拟DOM & 渲染 --------------------
function h(tag, props, children) {
  return { tag, props, children };
}

function mount(vnode, container) {
  const el = (vnode.el = document.createElement(vnode.tag));
  
  // 处理props
  for (const key in vnode.props) {
    if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), vnode.props[key]);
    } else {
      el.setAttribute(key, vnode.props[key]);
    }
  }
  
  // 处理children
  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => mount(child, el));
  }
  
  container.appendChild(el);
}

function patch(oldVNode, newVNode) {
  const el = (newVNode.el = oldVNode.el);
  
  // 更新props（简化版）
  const oldProps = oldVNode.props || {};
  const newProps = newVNode.props || {};
  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      if (key.startsWith('on')) {
        el.removeEventListener(key.slice(2).toLowerCase(), oldProps[key]);
        el.addEventListener(key.slice(2).toLowerCase(), newProps[key]);
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }
  
  // 更新children（简化版）
  if (typeof newVNode.children === 'string') {
    el.textContent = newVNode.children;
  } else {
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];
    
    // 简单diff算法
    const commonLen = Math.min(oldChildren.length, newChildren.length);
    for (let i = 0; i < commonLen; i++) {
      patch(oldChildren[i], newChildren[i]);
    }
    
    if (newChildren.length > oldChildren.length) {
      newChildren.slice(oldChildren.length).forEach(child => mount(child, el));
    } else {
      oldChildren.slice(newChildren.length).forEach(child => el.removeChild(child.el));
    }
  }
}

// -------------------- 组件系统 --------------------
function createApp(rootComponent) {
  return {
    mount(container) {
      let prevVNode = null;
      effect(() => {
        if (!prevVNode) {
          prevVNode = rootComponent.render();
          mount(prevVNode, container);
        } else {
          const newVNode = rootComponent.render();
          patch(prevVNode, newVNode);
          prevVNode = newVNode;
        }
      });
    }
  };
}