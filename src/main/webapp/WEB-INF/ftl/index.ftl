<#import "/spring.ftl" as spring />
<!DOCTYPE html>
<html>
<head prefix="og: http://ogp.me/ns#">
    <title>Example</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="<@spring.url "/public/css/all.css" />" />
</head>
<body ng-app="app">
    Look how the static resources are linked:
    <ul>
        <li><@spring.url "/public/css/all.css" /></li>
        <li><@spring.url "/public/js/all.js" /></li>
    </ul>
</div>
<script src="<@spring.url "/public/js/all.js" />"></script>
</body>
</html>