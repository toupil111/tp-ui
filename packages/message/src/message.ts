import { ImessageOptions,MessageHandler } from "./message.type";
import MessageComponent from "./messageComponent.vue";
import { createVNode, render, computed } from "vue";
import { instances  } from "./instances";

const closeMessage = (instance: any) => {
  const idx = instances.indexOf(instance)
  if (idx === -1) return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}
let seed = 1
const createMessage = (component,options) => {
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const container = document.createElement('div')

  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose && userOnClose()
      closeMessage(instance)
    },

    onDestroy: () => {
      render(null, container)
    },
  }
  const vnode = createVNode(
    component,
    props,
  )

  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const handler: MessageHandler = {
    close: () => {
      vm.exposed!.show = false
    },
  }

  const instance: any = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  }

  return instance
}

const Message = (options: ImessageOptions) => {
  //ts中类型保护  （1）string （2）对象
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }
  if (options.grouping && instances.length) {
    const instance = instances.find(
      ({ vnode: vm }) => vm.props?.message === options.message
    )
    if (instance) {
      console.log(instance.props);
      instance.props.repeatNum += 1
      // instance.props.type = options.type
      return instance.handler
    }
  }
  
  const instance = createMessage(MessageComponent,options)

  instances.push(instance)
  
  return instance.handler
};
export default Message;
