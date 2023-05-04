# You are given a binary tree:

# class Node:
#     def __init__(self, L, R, n):
#         self.left = L
#         self.right = R
#         self.value = n

# Your task is to return the list with elements from tree sorted by levels, which means the root element goes first, then root children (from left to right) are second and third, and so on.

# Return empty list if root is None.

# Example 1 - following tree:

#                  2
#             8        9
#           1  3     4   5

# Should return following list:

# [2,8,9,1,3,4,5]

# Example 2 - following tree:

#                  1
#             8        4
#               3        5
#                          7

# Should return following list:

# [1,8,4,3,5,7]

def tree_by_levels(node):
    if not node: return []
    
    final_ls = []
    visited = set()

    queue = [node]
    while len(queue):
        curr_node = queue.pop(0)

        if curr_node not in visited:
            visited.add(curr_node)
            final_ls.append(curr_node.value)

        neighbors = []
        
        if curr_node.left: neighbors.append(curr_node.left)
        if curr_node.right: neighbors.append(curr_node.right)

        for n in neighbors:
            if n not in visited:
                visited.add(n)
                queue.append(n)
                final_ls.append(n.value)
    
    return final_ls