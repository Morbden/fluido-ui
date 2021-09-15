interface TypedMap<T = any> {
  [key: string]: T
}

export class GenericNode {
  private _children: GenericNode[]
  private _parent?: GenericNode
  private _core_properties: TypedMap
  id: string
  properties: TypedMap<string>

  constructor(id: string) {
    this.id = id
    this._children = []
    this._core_properties = {}
    this.properties = new Proxy(this._core_properties, {
      get<T = any>(target: TypedMap, p: string): T {
        return target[p] || null
      },
      has(target: TypedMap, p: string) {
        return p in target
      },
      set(target: TypedMap, p: string, value: any) {
        if (typeof value === 'undefined') {
          delete target[p]
        } else {
          target[p] = value
        }
        return true
      },
    })
  }

  get parent() {
    return this._parent
  }

  destroy() {
    this._parent?.removeChild(this)
  }

  getChildren() {
    return [...this._children]
  }

  getChild(index: number | string | GenericNode) {
    if (typeof index === 'number') {
      return this._children[index]
    } else if (typeof index === 'string') {
      return this._children.find((c) => c.id === index)
    } else {
      return this._children.find((c) => c.id === index.id)
    }
  }

  addChild(child: GenericNode, index = -1) {
    const same = this.getChild(child)

    if (!same) {
      child._parent = this
      if (index >= 0) {
        this._children.splice(index, 1, child)
      } else {
        this._children.push(child)
      }
    } else {
      for (const k in child.properties) {
        same.properties[k] = child.properties[k]
      }
      child._children.forEach((c) => same.addChild(c))
    }
  }

  findIndex(child: GenericNode) {
    return this._children.findIndex((c) => c.id === child.id)
  }

  removeChild(index: number | GenericNode) {
    if (typeof index === 'number') {
      return this._children.splice(index, 1)
    } else {
      const i = this.findIndex(index)
      return this._children.splice(i, 1)
    }
  }

  contains(child: GenericNode) {
    this._children.some((c) => c.id === child.id || c.contains(child))
  }

  findChild(id: string): GenericNode | null {
    for (let k in this._children) {
      const c = this._children[k]
      if (c.id === id) return c

      const cc = c.findChild(id)
      if (cc) return cc
    }
    return null
  }

  isEmpty() {
    return !this._children.length
  }

  isPropsEmpty() {
    return !Object.keys(this._core_properties).length
  }

  clone() {
    const clone = new GenericNode(this.id)
    for (let k in this._core_properties) {
      clone._core_properties[k] = this._core_properties[k]
    }
    clone._children = this._children.map((c) => c.clone())
    return clone
  }

  addInTree(child: GenericNode, index = -1) {
    let parent = this._parent
    while (!!parent?.parent) {
      parent = parent.parent
    }

    if (!parent) {
      this.addChild(child, index)
    } else {
      parent.addChild(child, index)
    }
  }

  mergeToParent() {
    if (!this._parent) return

    for (const k in this._core_properties) {
      this._parent._core_properties[k] = this._core_properties[k]
    }

    this._children.forEach((c) => this._parent?.addChild(c))
    this.destroy()
  }

  getMap() {
    const data: TypedMap = { ...this._core_properties }

    this._children.forEach((c) => {
      data[c.id] = c.getMap()
    })

    return data
  }
}
