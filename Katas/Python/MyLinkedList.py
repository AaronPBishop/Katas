class Node:
  def __init__(self, value):
    self.value = value
    self.next = None
    

class LinkedList:
  def __init__(self):
    self.head = None
    self.tail = None
    self.length = 0


  def get_node(self, position):
    if self.head == None:
      return None

    i = 0
    currVal = self.head

    while i < self.length:
      if currVal == None:
        return None

      if i == position:
        return currVal

      if currVal.next:
        currVal = currVal.next
        i += 1

  
  def add_to_tail(self, value):
    value = Node(value)

    if self.head == None:
      self.head = value
      self.tail = value
      self.length += 1
      return

    if self.length == 1:
      self.tail = value
      self.head.next = value
      self.length += 1
      return

    self.tail.next = value
    self.tail = value
    self.length += 1

  
  def add_to_head(self, value):
    value = Node(value)

    if self.head == None:
      self.head = value
      self.tail = value
      self.length += 1
      return

    headVal = self.head
    self.head = value
    self.head.next = headVal
    self.length += 1

  
  def remove_head(self):
    if self.length == 0:
      return None
    
    nextNode = self.head.next
    self.head = None
    self.head = nextNode

    self.length -= 1

    return self.head

  
  def remove_tail(self):
    if self.head == None:
      return None

    i = 0
    currNode = self.head

    while i < self.length:
      if currNode.next == self.tail:
        self.tail = None
        self.tail = currNode
        self.length -= 1
        return self.tail

      currNode = currNode.next
      i += 1

  
  def __len__(self):
    return self.length

  
  def contains_value(self, target):
    if self.head.value == None:
      return False

    i = 0
    currNode = self.head

    while i < self.length:
      if currNode.value == target:
        return True

      if currNode == None:
        return False
      
      currNode = currNode.next
      i += 1

    return False


  def insert_value(self, position, value):
    new_node = Node(value)

    if position > self.length + 1 or position < 0:
      return False

    if position == 0:
      self.add_to_head(new_node)
      return True

    if position == self.length:
      self.add_to_tail(new_node)
      return True

    i = 0
    currNode = self.head

    while i < self.length:
      if i == position - 1:
        next_node = currNode.next
        currNode.next = new_node
        currNode.next.next = next_node

        self.length += 1

        return True

      if currNode.next:
        currNode = currNode.next
        i += 1
      if currNode == None:
        return False

    return False


  def update_value(self, position, value):
    if position > self.length + 1 or position < 0:
      return False

    node_to_update = self.get_node(position)
    if not node_to_update: 
      return False

    node_to_update.value = value

    return True


  def remove_node(self, position):
    if position > self.length + 1 or position < 0:
      return False

    if position == 0:
      self.remove_head()
      return True

    if position == self.length:
      self.remove_tail()
      return True

    i = 0
    currNode = self.head

    while i < self.length:
      if i == position - 1:
        node_to_delete = currNode.next
        saved_node = currNode.next.next

        del node_to_delete
        currNode.next = saved_node

        self.length -= 1

        return True

      if currNode.next:
        currNode = currNode.next
        i += 1
      if currNode == None:
        return False

    return False
  
  
  def __str__(self):
    newStr = ''

    if self.length == 0:
      newStr += 'Empty list'

    i = 0
    curr_node = self.head

    while i < self.length:
      newStr += f'{curr_node.value} '

      if curr_node.next == None:
        return newStr

      curr_node = curr_node.next
      i += 1

    return newStr