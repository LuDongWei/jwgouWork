

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link rel="stylesheet" type="text/css" href="/css/nflow.css" />

    <script type="text/javascript" src="/js/jquery_1.8.js"></script>

    <script type="text/javascript" src="/jquery.nflow.js"></script>

    <script type="text/javascript" src="/js/flash_upload.js"></script>
    
    <script >
        function uploadComplete(imgArr) {
            alert(imgArr);
        }
    </script>
</head>
<body>
    <form id="Form1" runat="server">
        
        <input type="button" id="Uploadinput" value="上传文件" class="upload" url="/UpImage/UserControl/flashupload.html?width=550&height=510&bg=1000&path=/UpImage/UpProduct/&max=2&uploadUrl=/UpImage/UserControl/handler/upload.ashx&key=generate_upload_image" />
    </form>
</body>
</html>
