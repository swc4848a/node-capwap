let logout = {
    gate: [
        ["div.small-hide:contains('admin')"],
        ["span.ng-binding:contains('Logout'):eq(0)"],
    ]
}

module.exports = logout;
