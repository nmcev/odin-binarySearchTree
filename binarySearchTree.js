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

