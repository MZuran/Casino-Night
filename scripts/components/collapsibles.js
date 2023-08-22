//************************************************* Collapsibles *************************************************
function toggleOptionsCollapse() {
    const collapsibleElement = document.getElementById(
      'collapsibleOptionsElement',
    )
    collapsibleElement.classList.toggle('expanded')
  
    if (collapsibleElement.classList.contains('expanded')) {
      collapsibleElement.style.display = 'flex'
    } else {
      setTimeout(() => (collapsibleElement.style.display = 'none'), 300)
    }
  }
  toggleOptionsCollapse()
  
  function toggleLogsCollapse() {
    const collapsibleElement = document.getElementById('collapsibleLogsElement')
    collapsibleElement.classList.toggle('expanded')
  
    if (collapsibleElement.classList.contains('expanded')) {
      collapsibleElement.style.display = 'flex'
    } else {
      setTimeout(() => (collapsibleElement.style.display = 'none'), 300)
    }
  }
  toggleLogsCollapse()
  
  