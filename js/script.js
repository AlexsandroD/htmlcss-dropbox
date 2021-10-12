

const ACCORDION_LIST          = 'data-accordion-list'
const ACCORDION_BUTTON        = 'data-accordion-button'
const ACCORDION_ARROW         = 'data-accordion-arrow'
const ACCORDION_CONTENT       = 'data-accordion-content'
const SECTION_OPENED          = 'open'
const ICON_ROTATED            = 'rotated'

class Accordion {
  static apply(accordionNode) {
    if (!accordionNode) {
      return
    }

    const acc = new Accordion()
    acc.accordion = accordionNode
    accordionNode.onclick = acc.onClick.bind(acc)
  }

  handleClick(button) {
    const innerSection = button.nextElementSibling
    const isOpened = innerSection.classList.contains(SECTION_OPENED)

    if (isOpened) {
      this.close(innerSection)
      return
    }
    this.open(innerSection)
  }

  open(section) {
    const accordionContent = section.querySelector(`[${ACCORDION_CONTENT}`)
    const accordionList = accordionContent.querySelector(`[${ACCORDION_LIST}`)
    const innerSectionHeight = accordionContent.clientHeight
    let countOfScrollHeight = 0;
    const allElementContentData = section.querySelectorAll(`[${ACCORDION_CONTENT}`)
    section.classList.add(SECTION_OPENED)
    this.rotateIconFor(section.previousElementSibling)

    for (const item of allElementContentData) {
      countOfScrollHeight = countOfScrollHeight + item.scrollHeight;
    }

    if (accordionContent.contains(accordionList)) {
      section.style.maxHeight = `${innerSectionHeight + countOfScrollHeight}px`
      return
    }
    section.style.maxHeight = `${innerSectionHeight}px`
  }

  close(section) {
    section.style.maxHeight = 0
    section.classList.remove(SECTION_OPENED)
    this.rotateIconFor(section.previousElementSibling)
  }

  rotateIconFor(button) {
    const rotatedIconClass = ICON_ROTATED
    const arrowElement = button.dataset.hasOwnProperty('accordionArrow') ?
      button :
      button.querySelector(`[${ACCORDION_ARROW}]`)

    if (!arrowElement) {
      return
    }

    const isOpened = arrowElement.classList.contains(rotatedIconClass)
    if (!isOpened) {
      arrowElement.classList.add(rotatedIconClass)
      return
    }
    arrowElement.classList.remove(rotatedIconClass)
  }

  onClick(event) {
    let button = event.target.closest(`[${ACCORDION_BUTTON}]`)
    if (button && button.dataset.accordionButton !== undefined) {
      this.handleClick(button)
    }
  }
}

Accordion.apply(document.querySelector(`[${ACCORDION_LIST}`))



