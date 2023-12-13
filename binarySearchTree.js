class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array, 0, array.length - 1)
    }

    buildTree(array, start, end) {

        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        
        return root;
    }

    insert(value, currentRoot = this.root) {
        const newNode = new Node(value);

        if (!currentRoot) {
            this.root = newNode;
            return;
        }

        if (value === currentRoot.value) return;
        if (value > currentRoot.value) {

            if (!currentRoot.right) {
                currentRoot.right = newNode;
            } else {
                this.insert(value, currentRoot.right);
            }

        } else if (value < currentRoot.value) {

            if (!currentRoot.left) {
                currentRoot.left = newNode;
            } else {
                this.insert(value, currentRoot.left)
            }
        }
    }

    delete(value, node = this.root) {

        if (value > node.value) {
            node.right = this.delete(value, node.right);
        } else if (value < node.value) {
            node.left = this.delete(value, node.left);
        } else {
            if (!node.left && !node.right) return null;
            else if (!node.left) return node.right;
            else if (!node.right) return node.left;
            else { 

                const maxNode = this.findMax(node.right);

                node.value = maxNode.value;
                node.right = this.delete(maxNode.value, node.right);
            }
        }

        return node;
    }

    findMax(node) {
        while (node.right) {
            node = node.right
        }
        return node;
    }

    find(value, node = this.root) {

        if (!node) {
            return null;
        };

        if (value === node.value) {
            return node.value;
        } else {

            if (value > node.value) {
                return this.find(value, node.right);
                // passing the right subtree to continue searching because the value is bigger the current node value
            } else {
                return this.find(value, node.left);
                // as well as above passing the left subtree to continue searching for the value
            }
        };
    }
    

    levelOrder(node = this.root, queue = [node], values = []) {
        if (!node || queue.length === 0) return;

        const currentNode = queue.shift();

        values.push(currentNode.value)

        if (currentNode.left) {
            queue.push(currentNode.left);
        }

        if (currentNode.right) {
            queue.push(currentNode.right);
        }

        this.levelOrder(node, queue, values);
        return values.join(' -> ')
    }

    preOrder(callback = null, node = this.root) {
        if (!node) return [];

        const values = []; 

        const traverse = (currentNode) => {
            if (callback) {
                callback(currentNode.value);
            } else {
                values.push(currentNode.value);
            }

            if (currentNode.left) traverse(currentNode.left);

            if (currentNode.right) traverse(currentNode.right);
        }

        traverse(node);

        return values.length ? values.join(' -> ') : undefined;

    }

    inOrder(callback = null, node = this.root) {
        if (!node) return [];
    
        const values = [];
    
        const traverse = (currentNode) => {
            if (currentNode.left) traverse(currentNode.left);
    
            if (callback) {
                callback(currentNode.value);
            } else {
                values.push(currentNode.value);
            }
    
            if (currentNode.right) traverse(currentNode.right);
        };
    
        traverse(node);
    
        return values.length ? values.join(' -> ') : undefined;
    }

    postOrder(callback = null, node = this.root) { 
        if (!node) return []; 
        const values = [];

        const traverse = (currentNode) => {
            if (currentNode.left) traverse(currentNode.left);
    
            if (currentNode.right) traverse(currentNode.right);
    
            if (callback) {
                callback(currentNode.value);
            } else {
                values.push(currentNode.value);
            }
        };
    
        traverse(node);
    
        return values.length ? values.join(' -> ') : undefined;
    }

    height(root = this.root) {

        if (root === null) {
            return -1;
        }

        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);

        // plus one for the node tree
        return 1 + Math.max(leftHeight, rightHeight);
    }  

    depth(root = this.root, value, count = -1) {

        if (root === null) {
            return -1;
        }
    
        count++;
        if (value === root.value) {
            return count;
        } else if (value < root.value) {
            return this.depth(root.left, value, count);
        } else {
            return this.depth(root.right, value, count);
        }
    }
     
    isBalanced(root = this.root) {
        if (!root) return true;

        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            console.log("root:", root.value);
            console.log("left height:", leftHeight + 1);
            console.log("right height:", rightHeight + 1);
            console.log("difference:", Math.abs(leftHeight - rightHeight));

            return false;
        }

        return this.isBalanced(root.left) && this.isBalanced(root.right);
    }

    rebalance() {
        
        const values = this.inOrder().split(' -> ');
        this.root = this.buildTree(values, 0, values.length - 1);
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function randomArray(size = 10, max = 99) {
    return Array(size).fill(0).map(() => Math.round(Math.random() * max));
}
const array = randomArray();

// Crate a tree with the array 
const tree = new Tree(array);

// Confirm the tree is balanced
console.log(`Is balanced: ${tree.isBalanced()} \n`);

// Print all elements in all DFS methods
console.log(`Pre-order: ${tree.preOrder()} \n`);
console.log(`In-order: ${tree.inOrder()} \n`);
console.log(`Post-order: ${tree.postOrder()} \n`);

// Print all elements in level order
console.log(`Level-order: ${tree.levelOrder()}\n`);

// Unbalance the tree by inserting number is > 100 

tree.insert(125);
tree.insert(150);
tree.insert(175);

// Confirm that the tree is unbalanced  
console.log(`\x1b[31mIs balanced: ${tree.isBalanced()} \n\x1b[0m`);

// Balance the tree with rebalance()
tree.rebalance()

// Confirm that the tree is balanced  
console.log(`Is balanced: ${tree.isBalanced()} \n`);


// Print all elements in all DFS methods
console.log(`Pre-order: ${tree.preOrder()} \n`);
console.log(`In-order: ${tree.inOrder()} \n`);
console.log(`Post-order: ${tree.postOrder()} \n`);

// Print all elements in level order
console.log(`Level-order: ${tree.levelOrder()}\n`);


prettyPrint(tree.root)