function preOrder(root){
    let res=[],
    stack=[root];
    while(stack.length>0){
        let node=stack.pop();
        res.push(node.val);
        if(node.right){
            stack.push(node.right);
        }
        if(node.left){
            stack.push(node.right);
        }

    }
    return res;
}
//非递归算法 实现中序遍历二叉树   首先遍历找到最深层的左子树，
function inOrder(root){
    let res=[],
        stack=[];
        while(root||stack.length>0){
            while(root){
                stack.push(root);
                root=root.left;
            }
            root=stack.pop();
            res.push(root.val);
            root=root.right;
        }
        return res;
}
// 非递归算法实现后序遍历二叉树， 和先序遍历二叉树类似，唯一区别是向数组中unshift元素，先push左再push右
function lastOrder(root){
    let res=[],
    stack=[root];
    while(stack.length>0){
        let node=stack.pop();
        res.unshift(node.val);
        if(node.left){
            stack.push(node.left);
        }
        if(node.right){
            stack.push(node.right);
        }
    }
    return res;
}