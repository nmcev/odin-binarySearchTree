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
    
    printValue(nodeValue) {
        console.log(nodeValue);
    }

    levelOrder(node = this.root, queue = [node], printValue = this.printValue) {
        if (!node || queue.length === 0) return;

        const currentNode = queue.shift();

        if (printValue) {
            printValue(currentNode.value);
        }

        if (currentNode.left) {
            queue.push(currentNode.left);
        }

        if (currentNode.right) {
            queue.push(currentNode.right);
        }

        this.levelOrder(node, queue, printValue)
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

