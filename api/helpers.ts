import convert from "xml-js"

export const parseHTML = (text: string) => {
  const content = convert.xml2js("<div>" + text + "</div>")
  content.elements[0].elements = content.elements[0].elements.map((item: any) => {
    if (item.name === "title") item.name = "h3"
    if (item.name === "section-title") item.name = "h4"
    return item
  })
  return convert.js2xml(content)
}