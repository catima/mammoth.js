var assert = require("assert");
var test = require("./testing").test;

var HtmlGenerator = require("../lib/html-generator").HtmlGenerator;
var styles = require("../lib/styles");


describe('HtmlGenerator', function() {
    test('generates empty string when newly created', function() {
        var generator = new HtmlGenerator();
        return assert.equal("", generator.asString());
    });
    
    test('HTML-escapes text', function() {
        var generator = new HtmlGenerator();
        generator.text("<");
        return assert.equal(generator.asString(), "&lt;");
    });
    
    test('asString closes all elements', function() {
        var generator = new HtmlGenerator();
        generator.style(styles.elements(["p", "span"]));
        generator.text("Hello!");
        return assert.equal(generator.asString(), "<p><span>Hello!</span></p>");
    });
    
    test('can leave some HTML elements for next style', function() {
        var generator = new HtmlGenerator();
        var listStyle = styles.elements([
            styles.element("ul", {fresh: false}),
            styles.element("li", {fresh: true})
        ])
        generator.style(listStyle);
        generator.text("Apple");
        generator.style(listStyle);
        generator.text("Banana");
        return assert.equal(generator.asString(), "<ul><li>Apple</li><li>Banana</li></ul>");
    });
})
