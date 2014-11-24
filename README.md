# Lightbox

This is a jQuery plugin that provides a simple lightbox.

## Example Usage

```javascript
$('.button').lightbox({
    // parameters go here
}).on("lightbox-closed", function() {
    // console.log("You just closed the lightbox.");
});
```

## Default parameters

```javascript
{
    container: ".lightbox",
    content: ".lightbox-content",
    isOpenClass: "open",
    activeClass: "active",
    closeOnClick: ".lightbox-overlay, .lightbox-close, .lightbox-frame",
    closeOnESC: true,
    descendantSelector: null,
    processAjaxResponse: function(data, textStatus, jqXHR) {

        var ct = jqXHR.getResponseHeader("content-type") || "";

        if (ct.indexOf("json") > -1) {
            return data.content;
        }

        return data;
    }
}
```
