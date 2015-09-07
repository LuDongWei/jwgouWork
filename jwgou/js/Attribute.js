var Attribute = 1;
var AttributeValue1 = 1;
var AttributeValue2 = 1;
var AttributeValue3 = 1;
var AttributeValue4 = 1;
var AttributeValue5 = 1;

//检测是否有属性
function CheckIsHaveAttri() {
    if ($('#Attribute1_HiddenFieldValue').val() == "") {
        $("#Fkc").attr("disabled", false  );  
    }
    else {
        $('#Price').val('');
        $('#NPrice').val('');
        $("#Fkc").attr("disabled", true  );  
    }
}

//添加属性值处理属性值个数
function GetAttributeValueNameNum(NameNum) {
    if (NameNum == 1) { if (AttributeValue1 == 20) { alert('属性值最多可添加20个！'); return false; } else { AttributeValue1++; return AttributeValue1; } }
    else if (NameNum == 2) { if (AttributeValue2 == 20) { alert('属性值最多可添加20个！'); return false; } else { AttributeValue2++; return AttributeValue2; } }
    else if (NameNum == 3) { if (AttributeValue3 == 20) { alert('属性值最多可添加20个！'); return false; } else { AttributeValue3++; return AttributeValue3; } }
    else if (NameNum == 4) { if (AttributeValue4 == 20) { alert('属性值最多可添加20个！'); return false; } else { AttributeValue4++; return AttributeValue4; } }
    else if (NameNum == 5) { if (AttributeValue5 == 20) { alert('属性值最多可添加20个！'); return false; } else { AttributeValue5++; return AttributeValue5; } }

}
//得到现在属性值个数
function GetNowAttributeValueNameNum(NameNum) {
    if (NameNum == 1) { return AttributeValue1; }
    else if (NameNum == 2) { return AttributeValue2; }
    else if (NameNum == 3) { return AttributeValue3; }
    else if (NameNum == 4) { return AttributeValue4; }
    else if (NameNum == 5) { return AttributeValue5; }
    else { return 0; }
}

//删除修改属性值数量
function GetDelAttributeValueNameNum(NameNum) {
    if (NameNum == 1) { AttributeValue1--; }
    else if (NameNum == 2) { AttributeValue2--; }
    else if (NameNum == 3) { AttributeValue3--; }
    else if (NameNum == 4) { AttributeValue4--; }
    else if (NameNum == 5) { AttributeValue5--; }
}
//转移属性值数量
function GetMoveAttributeValueNameNum(NameNum) {
    if (NameNum == 1) { AttributeValue1 = 1; }
    else if (NameNum == 2) { AttributeValue1 = AttributeValue2; AttributeValue2 = 1; }
    else if (NameNum == 3) { AttributeValue2 = AttributeValue3; AttributeValue3 = 1; }
    else if (NameNum == 4) { AttributeValue3 = AttributeValue4; AttributeValue4 = 1; }
    else if (NameNum == 5) { AttributeValue4 = AttributeValu; e5AttributeValue5 = 1; }
    else {
        Attribute = 1;
        AttributeValue1 = 1;
        AttributeValue2 = 1;
        AttributeValue3 = 1;
        AttributeValue4 = 1;
        AttributeValue5 = 1;
        $('#Attribute1_HiddenField1').val('');
        $('#Attribute1_HiddenField2').val('');
        $('#Attribute1_HiddenField3').val('');
        $('#Attribute1_HiddenField4').val('');
        $('#Attribute1_HiddenField5').val('');
    }
}
//检测属性名是否已存在
function CheckAname(AttributeName, idstr) {
    for (var i = 1; i < Attribute; i++) {
        if (idstr == 0) {
            if (AttributeName == $('#AttributeName' + i).val()) {
                alert('属性名已存在！');
                return false;
                break;
            }
        }
        else {
            if (i != idstr) {
                if (AttributeName == $('#AttributeName' + i).val()) {
                    alert('属性名已存在！');
                    return false;
                    break;
                } 
            }
        }
    }
    return true;
}
//检测属性值是否已存在
function CheckAValue(AttributeValue, idstr, Valuenum) {
    if (AttributeValue != "") {
        for (var i = 1; i <= (Attribute - 1); i++) {
            for (var j = 1; j <= GetNowAttributeValueNameNum(i); j++) {
                if (Valuenum != i) {
                    if (AttributeValue == $('#txtAttributeValue_' + i + '_' + j).val()) {
                        alert('属性值已存在！');
                        return false;
                        break;
                    }
                }
                else if (idstr != j) {
                    if (AttributeValue == $('#txtAttributeValue_' + i + '_' + j).val()) {
                        alert('属性值已存在！');
                        return false;
                        break;
                    }
                }
            }
        }
        return true;
    }
}

$(document).ready(function() {
    //属性添加按钮事件

    $('#AddAttribute').click(function() {
        //获取属性名
        var txtAttribute = $('#txtAttribute').val();
        if (txtAttribute != "") {
            if (!CheckAname(txtAttribute, 0)) {
                txtAttribute = "";
            }
            if (Attribute <= 5) {
                //属性名不为空
                if (txtAttribute != "") {
                    //属性值是否已经完全填写
                    var AttributeValue = true;
                    for (var j = 1; j < Attribute; j++) {
                        for (var i = 1; i <= GetNowAttributeValueNameNum(j); i++) {
                            if ($('#txtAttributeValue_' + j + "_" + i).val() == "") {
                                AttributeValue = false;
                                break;
                            }
                        }
                    }
                    //属性名
                    PostValue(txtAttribute);
                    if (AttributeValue) {
                        $('#delAttributebtn').remove();
                        $('#AttributeHtml').append("<div id='AttributeNameDIV" + Attribute + "' class='AttributeDiv'  ><p id='pat" + Attribute + "'>规格名：<input id='AttributeName" + Attribute + "' type='text' class='text' value='" + txtAttribute + "' onkeyup=PostValue('');ViewAbText(); onblur=if(this.value!=''){if(!CheckAname(this.value," + Attribute + ")){this.value='';}}else{alert('属性名不可为空！');} /><input type='button' class='button' id='delAttributebtn'  value='删除规格' onclick='DelAttributeNameFun(" + Attribute + ")' style='margin-left: 5px;'/></p>"
                                                    + "<div id='AttributeValueDIV" + Attribute + "' style='width:100%;'>"
                                                        + "<input id='txtAttributeValue_" + Attribute + "_1' type='text' class='text' onkeyup='AttributeValueKeyup(this);noSymbol(this)' onblur=if(this.value==''){DelAttributeValueFun(" + Attribute + ",1);}else{if(!CheckAValue(this.value,1," + Attribute + ")){this.value='';}} style='width:80px;margin-top: 8px;' />"
                                                        + "<a href='javascript:void' class='iconfont close' onclick='DelAttributeValueFun(" + Attribute + ",1);AttributeValueKeyup(this);' id='delAttributeValue_" + Attribute + "_1' >&#xe600;</a>"
                                                        + "</div><p><input type='button' class='button'  value='添加规格值' onclick='AddAttributeValueFun(" + Attribute + ",GetAttributeValueNameNum(" + Attribute + "));' style='margin-top: 8px; '/></p>"
                                                    + "</div>");
                        Attribute++;
                    }
                    else {
                        alert("请填写完整上面属性的属性值后继续添加属性！谢谢！");
                    }
                }
            }
            else {
                alert("属性不能超过5个！");
            }
        }
        else {
            alert("请输入属性名！");
        }
    });

    //清空属性
    $('#btnEmpty').click(function() {
        GetMoveAttributeValueNameNum(0);
        $('#AttributeHtml').empty();
        ViewAbText();
        PostValue('');
        PostKc();
        CheckIsHaveAttri();
        $('#Attribute1_HiddenFieldKc').val('');
    });
});

//添加属性值
function AddAttributeValueFun(AttributeNameNum, AttributeValueNameNum) {
    if (AttributeValueNameNum != false) {
        //属性值是否已经完全填写
        var AttributeValue = true;
        for (var i = 1; i <= GetNowAttributeValueNameNum(AttributeNameNum); i++) {
            if ($('#txtAttributeValue_' + AttributeNameNum + "_" + i).val() == "") {
                AttributeValue = false;
                break;
            }
        }
        if (AttributeValue) {
            $('#AttributeValueDIV' + AttributeNameNum).append("<input id='txtAttributeValue_" + AttributeNameNum + "_" + AttributeValueNameNum + "' type='text' class='text' onkeyup='AttributeValueKeyup(this);noSymbol(this);' onblur=if(this.value==''){DelAttributeValueFun(" + AttributeNameNum + "," + AttributeValueNameNum + ");}else{if(!CheckAValue(this.value," + AttributeValueNameNum + "," + AttributeNameNum + ")){this.value='';}}  style='width:80px;margin-top: 8px;margin-left:20px;' />"
                                                         + "<a href='javascript:void' class='iconfont close' onclick='DelAttributeValueFun(" + AttributeNameNum + "," + AttributeValueNameNum + ");AttributeValueKeyup(this);' id='delAttributeValue_" + AttributeNameNum 
                                                         + "_" + AttributeValueNameNum + "' >&#xe600;</a>");
        }
        else {
            alert('属性值还有未填写的输入框！请确保填写完全后再添加属性输入框！谢谢！');
        }
    }
    else {
        return false;
    }
}
//删除属性值
function DelAttributeValueFun(AttributeNameNum, AttributeValueNameNum) {
    var attrnums = GetNowAttributeValueNameNum(AttributeNameNum);
    if (attrnums > 1) {
        $('#delAttributeValue_' + AttributeNameNum + "_" + AttributeValueNameNum).remove();
        $('#txtAttributeValue_' + AttributeNameNum + "_" + AttributeValueNameNum).remove();
        var AttributeValue = "";
        for (var i = (AttributeValueNameNum + 1); i <= attrnums; i++) {
            AttributeValue = "";
            if ($('#txtAttributeValue_' + AttributeNameNum + "_" + i).val() != "") {
                AttributeValue = $('#txtAttributeValue_' + AttributeNameNum + "_" + i).val();
            }
            $('#delAttributeValue_' + AttributeNameNum + "_" + i).remove();
            $('#txtAttributeValue_' + AttributeNameNum + "_" + i).remove();
            $('#AttributeValueDIV' + AttributeNameNum).append("<input id='txtAttributeValue_" + AttributeNameNum + "_" + (i - 1) + "' type='text' class='text' onkeyup=AttributeValueKeyup(this); onblur=if(this.value==''){DelAttributeValueFun(" + AttributeNameNum + "," + (i - 1) + ");}else{if(!CheckAValue(this.value," + (i - 1) + "," + AttributeNameNum + ")){this.value='';}}  style='width:80px;margin-top: 8px;' />"
                                                             + "<a href='javascript:void' class='iconfont close' onclick='DelAttributeValueFun(" + AttributeNameNum + "," + (i - 1) + ");AttributeValueKeyup(this);' id='delAttributeValue_" 
                                                             + AttributeNameNum + "_" + (i - 1) + "' >&#xe600;</a>");
            if (AttributeValue != "") {
                $('#txtAttributeValue_' + AttributeNameNum + "_" + (i - 1)).val(AttributeValue);
            }
        }
        GetDelAttributeValueNameNum(AttributeNameNum);
    }
    else {
        alert("每个属性至少有一个属性值！");
    }
}

//删除属性
function DelAttributeNameFun(Attributenum) {
    console.log('#AttributeNameDIV' + Attributenum)

    Attribute--;
    var txtAttribute ="";

    $('#AttributeNameDIV' + Attributenum).remove();

    console.log($('#AttributeNameDIV' + Attributenum))

    if ((Attributenum - 1) > 0) {
        $('#pat' + (Attributenum - 1)).append("<input type='button' class='button' id='delAttributebtn'  value='删除规格' onclick='DelAttributeNameFun(" + (Attributenum - 1) + ")' style='margin-top: 0px;margin-left: 5px;'/>")
    }

    var html = "";
    var arrtri = "";
    var onenum = 0;
    var num = getnumofc();
    var delattributebtn ='';
    if (Attributenum < num) {
        for (var i = Attributenum; i < num; i++) {
            html = "";
            delattributebtn = "";
            if (i == Attributenum) {
                delattributebtn = "<input type='button' id='delAttributebtn'  value='删除规格' onclick='DelAttributeNameFun(" + i + ")' style='margin-top: 8px;'/>";
            }
            txtAttribute = $('#AttributeName' + (i + 1)).val();
            arrtri += 'AttributeName' + i + "," + txtAttribute;
            html = "<div id='AttributeNameDIV" + i + "' class='AttributeDiv'><p id='pat" + i + "'>规格名：<input id='AttributeName" + i + "' type='text' onkeyup=PostValue('');ViewAbText(); onblur=if(this.value!=''){if(!CheckAname(this.value," + i + ")){this.value='';}}else{alert('属性名不可为空！');} />" + delattributebtn + "</p>"
                                                    + "<div id='AttributeValueDIV" + i + "'  style='width:100%;'>";
            onenum = GetOneAbNum(i + 1);
            for (var j = 1; j <= onenum; j++) {
                arrtri += ';'+'txtAttributeValue_' + i + '_' + j + ',' + $('#txtAttributeValue_' + (i + 1) + "_" + j).val();
                html += "<input id='txtAttributeValue_" + i + "_" + j + "' type='text' onkeyup='AttributeValueKeyup(this);noSymbol(this)' onblur=if(this.value==''){DelAttributeValueFun(" + i + "," + j + ");}else{if(!CheckAValue(this.value," + j + "," + i + ")){this.value='';}} style='width:80px' />";
                html += "<a href='javascript:void' class='iconfont close' onclick='DelAttributeValueFun(" + i + "," + j + ");AttributeValueKeyup(this);' id='delAttributeValue_" + i + "_" + j + "' >&#xe600;</a>";
            }
            html += "</div><p><input type='button'  value='添加规格值' onclick='AddAttributeValueFun(" + i + ",GetAttributeValueNameNum(" + i + "));' style='margin-top: 8px;'/></p></div>";
            
            $('#AttributeNameDIV' + (i + 1)).remove();

            $('#Attribute1_HiddenField' + i).val($('#Attribute1_HiddenField' + (i + 1)).val());
            $('#Attribute1_HiddenField' + (i + 1)).val('');
            GetMoveAttributeValueNameNum((i + 1));
            $('#AttributeHtml').append(html);
        }
        var asplit= arrtri.split(';');
        for (var i = 0; i < asplit.length; i++) {
            $('#' + asplit[i].split(',')[0]).val(asplit[i].split(',')[1]);
        }
    }
    else {
        $('#Attribute1_HiddenField' + Attributenum).val('');
    }
    ViewAbText();
    PostValue('');
    PostKc();
    CheckIsHaveAttri();
}


//删除图片
function delimg(i) {
    $('#fileuploadfont_' + i).html('没有图片');
    $('#fileupload_' + i).val('');
    $('#fileuploadfontid_' + i).html('');
    var imgstr = "";
    var HiddenFieldImgStr = $('#Attribute1_HiddenFieldImgStr').val();
    for (var j = 0; j < HiddenFieldImgStr.split(',').length; j++) {
        if (i == j) {
            imgstr += "2,";
        }
        else {
            imgstr += HiddenFieldImgStr.split(',')[j] + ",";
        }
    }
    imgstr = imgstr.substr(0, imgstr.length - 1);
    $('#Attribute1_HiddenFieldImgStr').val(imgstr);
}
//上传图片
function uploadfile() {
    var imgstr = "";
    for (var i = 0; i < AttributeValue1; i++) {
        if ($('#fileupload_' + i).val() != "") {
            imgstr += "1,";
        }
        else {
            imgstr += "0,";
        }
    }
    imgstr = imgstr.substr(0, imgstr.length - 1);
    $('#Attribute1_HiddenFieldImgStr').val(imgstr);
}
//批量设置价格
function SheZhiAttributePrice() {
    $('#DivAttributePrice').show();
}
function SheZhiPrice() {
    $('input[name="Price"]').val($('#txtPrice').val());
    $('#DivAttributePrice').hide();
}
//批量设置原价
function SheZhiAttributeYPrice() {
    $('#DivAttributeYPrice').show();
}
function SheZhiYPrice() {
    $('input[name="YPrice"]').val($('#txtYPrice').val());
    $('#DivAttributeYPrice').hide();
}
//画表格
function ViewAbText() {
    var HiddenField1=$('#Attribute1_HiddenField1').val() ;
    if (HiddenField1 != "") {
        var pichtml = "<thead><tr><td style='width:70px'>" + $("#Attribute1_HiddenFieldValue").val().split(',')[0] 
                    + "</td><td style='min-width:100px'>图片上传</td><td style='width:100px'>操作</td></tr></thead><tbody>";
        var HiddenField1arr = HiddenField1.split(',');
        var flieuploadinput = "";
        for (var i = 0; i < HiddenField1arr.length; i++) {
            flieuploadinput += "<input id='fileupload_" + i + "' type='file'  NAME='File'  style='width:0px;height:0px;float:right;' "
                             + " onchange=if($('#fileupload_" + i + "').val()!=''){$('#fileuploadfontid_" + i + "').html('1');$('#fileuploadfont_" + i
                             + "').html($('#fileupload_" + i + "').val().substring(0,4)+'...');$('#fileuploaddel_" + i + "').show();}uploadfile(); />";
            pichtml += "<tr><td style='height:35px;'>" + HiddenField1arr[i] + "</td><td><input  type='button' class='button' value='选择图片' onclick=$('#fileupload_" + i + "').click() />"
                            + "</td><td><font id='fileuploadfont_" + i + "'>没有图片</font>"
                            + "<a id='fileuploaddel_" + i + "' onclick='delimg("+i+")' class='userlist_a'>删除</a></td></tr>";
        }
        pichtml += "</tbody>";
        $("#mainAtablePic").empty();
        $("#mainAtablePic").append(pichtml);
        $("#fileinput").empty();
        $("#fileinput").html("<div style='width:10px;height:10px;'>" + flieuploadinput + "</div>");
    }
    else {
        $("#fileinput").empty();
        $("#mainAtablePic").empty();
        
    }
    var AllAbnum = GetAbNum();
    var rowspan1 = 0;
    var rowspan2 = 0;
    var rowspan3 = 0;
    var rowspan4 = 0;
    var rowspan5 = 0;
    var html = "";
    var Cen = getnumofc();
    html += "<thead><tr>";
    for (var i = 1; i <= Cen; i++) {
        html += "<td style='width:70px;'>" + $('#Attribute1_HiddenFieldValue').val().split(',')[(i-1)] + "</td>";
    }
    html += "<td style='width:90px;'><div><span>价格</span><span><a href='javascript:void(0)' class='iconfont settings' onclick='SheZhiAttributePrice()' style='margin-left:5px' >&#xe603;</a></span></div></td>";
    html += "<td style='width:90px;'><div><span>原价</span><span><a href='javascript:void(0)' class='iconfont settings' onclick='SheZhiAttributeYPrice()' style='margin-left:5px' >&#xe603;</a></span></div></td>";
    html += "<td style='width:90px;'>库存<font style='color:red'>*</font></td>";
    html+="<td style='width:90px;'>商家编码</td>";
    html += "</tr></thead><tbody>";
    for (var i = 0; i < AllAbnum; i++) {
        var inpid = "";
        var bodyhtml = "";
        var splitnum = 0;
        html += "<tr>";
        if (GetOneAbNum(1) != 0 && rowspan1 == 0) {
            splitnum = GetiNum(i, getcolnum(1), GetOneAbNum(1));
            html += "<td rowspan='" + getcolnum(1) + "' >" + $('#Attribute1_HiddenField1').val().split(',')[splitnum] + "</td>";
            rowspan1 = getcolnum(1);
            splitnum = splitnum + 1;
            inpid += "1_" + splitnum + "-";
        }
        else if (GetOneAbNum(1) != 0) {
            splitnum = GetiNum(i, getcolnum(1), GetOneAbNum(1)) + 1;
            inpid += "1_" + splitnum + "-";
        }
        if (GetOneAbNum(2) != 0 && rowspan2 == 0) {
            splitnum = GetiNum(i, getcolnum(2), GetOneAbNum(2));
            html += "<td rowspan='" + getcolnum(2) + "' >" + $('#Attribute1_HiddenField2').val().split(',')[splitnum] + "</td>";
            rowspan2 = getcolnum(2);
            splitnum = splitnum + 1;
            inpid += "2_" + splitnum + "-";
        }
        else if (GetOneAbNum(2) != 0) {
            splitnum = GetiNum(i, getcolnum(2), GetOneAbNum(2)) + 1;
            inpid += "2_" + splitnum + "-";
        }
        if (GetOneAbNum(3) != 0 && rowspan3 == 0) {
            splitnum = GetiNum(i, getcolnum(3), GetOneAbNum(3));
            html += "<td rowspan='" + getcolnum(3) + "' >" + $('#Attribute1_HiddenField3').val().split(',')[splitnum] + "</td>";
            rowspan3 = getcolnum(3);
            splitnum = splitnum + 1;
            inpid += "3_" + splitnum + "-";
        }
        else if (GetOneAbNum(3) != 0) {
            splitnum = GetiNum(i, getcolnum(3), GetOneAbNum(3)) + 1;
            inpid += "3_" + splitnum + "-";
        }
        if (GetOneAbNum(4) != 0 && rowspan4 == 0) {
            splitnum = GetiNum(i, getcolnum(4), GetOneAbNum(4));
            html += "<td rowspan='" + getcolnum(4) + "' >" + $('#Attribute1_HiddenField4').val().split(',')[splitnum] + "</td>";
            rowspan4 = getcolnum(4);
            splitnum = splitnum + 1;
            inpid += "4_" + splitnum + "-";
        }
        else if (GetOneAbNum(4) != 0) {
            splitnum = GetiNum(i, getcolnum(4), GetOneAbNum(4)) + 1;
            inpid += "4_" + splitnum + "-";
        }
        if (GetOneAbNum(5) != 0 && rowspan5 == 0) {
            splitnum = GetiNum(i, getcolnum(5), GetOneAbNum(5));
            html += "<td rowspan='" + getcolnum(5) + "' >" + $('#Attribute1_HiddenField5').val().split(',')[splitnum] + "</td>";
            rowspan5 = getcolnum(5);
            splitnum = splitnum + 1;
            inpid += "5_" + splitnum + "-";
        }
        else if (GetOneAbNum(5) != 0) {
            splitnum = GetiNum(i, getcolnum(5), GetOneAbNum(5)) + 1;
            inpid += "5_" + splitnum + "-";
        }
        inpid = inpid.substr(0, inpid.length - 1);
        bodyhtml = "<td><input id='inp-" + inpid + "-price'  type='text' class='text' style='width:80px'  onblur='Priceval(this);'  onchange='Priceval(this);KcNum(this);PostKc();' onafterpaste='Priceval(this);' name='Price'/></td>" +
                   "<td><input id='inp-" + inpid + "-Markprice' type='text' class='text' style='width:80px'  onblur='Priceval(this);'  onchange='Priceval(this);KcNum(this);PostKc();' onafterpaste='Priceval(this);' name='YPrice'/></td>" +
                   "<td><input id='inp-" + inpid + "-Kc' type='text' class='text' style='width:80px'  onblur='PositiveInteger(this);'  onchange='PositiveInteger(this);KcNum(this);PostKc();' onafterpaste='PositiveInteger(this);' /></td>"+
                   "<td><input id='inp-" + inpid + "-GoodsNum' type='text' class='text' onkeyup='noCoding(this)' style='width:80px' onchange='PostKc();'/></td>";
        html += bodyhtml + "</tr>";
        rowspan1 = rowspan1 - (rowspan1 == 0 ? 0 : 1);
        rowspan2 = rowspan2 - (rowspan2 == 0 ? 0 : 1);
        rowspan3 = rowspan3 - (rowspan3 == 0 ? 0 : 1);
        rowspan4 = rowspan4 - (rowspan4 == 0 ? 0 : 1);
        rowspan5 = rowspan5 - (rowspan5 == 0 ? 0 : 1);
    }
    html += "</tbody>";
    if (html == "<thead><tr><td style='width:90px;'>价格<font style='color:red'>*</font></td><td style='width:90px;'>原价<font style='color:red'>*</font></td><td style='width:90px;'>库存<font style='color:red'>*</font></td><td style='width:90px;'>商家编码</td></tr></thead><tbody></tbody>") {
        html = "";
    }
    $('#mainAtable').empty();
    $('#mainAtable').append(html);
    
    if (HiddenField1 == "") {
        $('#mainAtable').empty();
    }

    CheckIsHaveAttri();
    fuzhi();
}
//得到各属性名属性值排列组合总数量
function GetAbNum() {
    var havenum = 0;
    var ReturnGetAbNum = 1;
    if ($('#Attribute1_HiddenField1').val() != "") {
        ReturnGetAbNum = ReturnGetAbNum * parseInt($('#Attribute1_HiddenField1').val().split(',').length);
    }
    else {
        havenum++;
    }
    if ($('#Attribute1_HiddenField2').val() != "") {
        ReturnGetAbNum = ReturnGetAbNum * parseInt($('#Attribute1_HiddenField2').val().split(',').length);
    }
    else {
        havenum++;
    }
    if ($('#Attribute1_HiddenField3').val() != "") {
        ReturnGetAbNum = ReturnGetAbNum * parseInt($('#Attribute1_HiddenField3').val().split(',').length);
    }
    else {
        havenum++;
    }
    if ($('#Attribute1_HiddenField4').val() != "") {
        ReturnGetAbNum = ReturnGetAbNum * parseInt($('#Attribute1_HiddenField4').val().split(',').length);
    }
    else {
        havenum++;
    }
    if ($('#Attribute1_HiddenField5').val() != "") {
        ReturnGetAbNum = ReturnGetAbNum * parseInt($('#Attribute1_HiddenField5').val().split(',').length);
    }
    else {
        havenum++;
    }
    if (havenum == 5) {
        return 0;
    }
    else {
        return ReturnGetAbNum;
    }
}
//得到各属性某属性值数量
function GetOneAbNum(Numsth) {
    var txtString = $('#Attribute1_HiddenField' + Numsth).val()
    if (txtString != "") {
        return txtString.split(',').length;
    }
    else {
        return 0;
    }
}
//一共有几层
function getnumofc() {
    var num = 0;
    for (var i = 1; i <=10; i++) {
        if ($.trim($('#Attribute1_HiddenField' + i).val()) != "") {
            num++;
        }
    }
    return num;
}
//得到某列数量
function getcolnum(num) {
    var AllAbnum = GetAbNum();
    if (num == 1) {
        return (GetOneAbNum(1) == 0 ? 0 : (AllAbnum / GetOneAbNum(1)));
    }
    else if (num == 2) {
        return ((GetOneAbNum(1) * GetOneAbNum(2)) == 0 ? 0 : (AllAbnum / (GetOneAbNum(1) * GetOneAbNum(2))));
    }
    else if (num == 3) {
        return ((GetOneAbNum(1) * GetOneAbNum(2) * GetOneAbNum(3)) == 0 ? 0 : (AllAbnum / (GetOneAbNum(1) * GetOneAbNum(2) * GetOneAbNum(3))));
    }
    else if (num == 4) {
        return ((GetOneAbNum(1) * GetOneAbNum(2) * GetOneAbNum(3) * GetOneAbNum(4)) == 0 ? 0 : (AllAbnum / (GetOneAbNum(1) * GetOneAbNum(2) * GetOneAbNum(3) * GetOneAbNum(4))));
    }
    else if (num == 5) {
        return ((GetOneAbNum(1) * GetOneAbNum(2) * GetOneAbNum(3) * GetOneAbNum(4) * GetOneAbNum(5)) == 0 ? 0 : (AllAbnum / (GetOneAbNum(1) * GetOneAbNum(2) * GetOneAbNum(3) * GetOneAbNum(4) * GetOneAbNum(5))));
    }
    else {
        return 0;
    }
}
//数字控制（可有小数点）
function Priceval(obj) {
    if (!obj.value.match(/^[\+\-]?\d*?\.?\d*?$/)) {
        obj.value = obj.t_value;
    }
    else {
        obj.t_value = obj.value;
    }
    if (obj.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) {
        obj.o_value = obj.value
    }
    if (obj.value == 'undefined') {
        obj.value = '';
    }
}

//数字控制（不可有小数点）
function PositiveInteger(obj) {
    var vl=obj.value.replace(/\D/g, '');
    obj.value = (vl != '' ? (parseInt(vl) > 0 ? vl : '') : vl);
}
//得到数值
function GetiNum(i, j, n) {
    if (i != 0) {
        if (i % j == 0) {
            var num = i / j;
            if (j == 1) {
                var getone = n;
                i = i + 1;
                if (i <= getone) {
                    return (i - j);
                }
                else {
                    var xhnum = i;
                    for (var x = 0; x < xhnum; x++) {
                        if (i > getone) {
                            i = i - getone;
                        }
                        else {
                            break;
                        }
                    }
                    return (i - j);
                }
            }
            else {
                if (num >= n) {
                    var xhnum = num;
                    for (var x = 0; x < xhnum; x++) {
                        if (num >= n) {
                            num = num - n;
                        }
                        else {
                            break;
                        }
                    }
                    return num;
                }
                else {
                    return num;
                }
            }
        }
        else {
            var num = 0;
            var xhnum=0;
            for (var x = 0; x < j; x++) {
                i--;
                if (i % j == 0) {
                    num = i / j;
                    if (num >= n) {
                        xhnum = num;
                        for (var z = 0; z < xhnum; z++) {
                            if (num >= n) {
                                num = num - n;
                            }
                            else {
                                break;
                            }
                        }
                        return num;
                    }
                    else {
                        return num;
                    }
                    break;
                }
            }
            return 0;
        }
    }
    else {
        return 0;
    }
}

//属性名
function PostValue(txtAttribute) {
    var AttributeValueArr = "";
    for (var i = 1; i < Attribute; i++) {
        AttributeValueArr += $('#AttributeName' + i).val() + ",";
    }
    if (txtAttribute == "") {
        AttributeValueArr = AttributeValueArr.substr(0, AttributeValueArr.length - 1);
    }
    else {
        AttributeValueArr += txtAttribute;
    }
    $('#Attribute1_HiddenFieldValue').val(AttributeValueArr);
}
//属性值
function AttributeValueKeyup(obj) {
    var txtid = obj.id.split('_');
    var ValueNum = GetNowAttributeValueNameNum(txtid[1]);
    var ValueValarr = "";
    var ValueVal = "";
    for (var i = 1; i <= ValueNum; i++) {
        ValueVal = $.trim($('#txtAttributeValue_' + txtid[1] + '_' + i).val());
        if (ValueVal != '') {
            ValueValarr += ValueVal + ',';
        }
    }
    ValueValarr = ValueValarr.substr(0, ValueValarr.length - 1);
    $('#Attribute1_HiddenField' + txtid[1]).val(ValueValarr);
    ViewAbText();
    uploadfile();
    PostKc();
}
//价格库存
function PostKc() {
    var AllAbnum = GetAbNum();
    if (AllAbnum != 0) {
        var KcNum = 0;
        var pricenum = 0;
        var Markpricenum = 0;
        var rowspan1 = 0;
        var rowspan2 = 0;
        var rowspan3 = 0;
        var rowspan4 = 0;
        var rowspan5 = 0;
        var html = "";
        var Cen = getnumofc();
        var price = "";
        var Markprice = "";
        var Kc = "";
        var HiddenFieldKcstr = "";
        var GoodNumsStr="";
        for (var i = 0; i < AllAbnum; i++) {
            var inpid = "";
            if (GetOneAbNum(1) != 0 && rowspan1 == 0) {
                splitnum = GetiNum(i, getcolnum(1), GetOneAbNum(1)) + 1;
                inpid += "1_" + splitnum + "-";
            }
            else if (GetOneAbNum(1) != 0) {
                splitnum = GetiNum(i, getcolnum(1), GetOneAbNum(1)) + 1;
                inpid += "1_" + splitnum + "-";
            }
            if (GetOneAbNum(2) != 0 && rowspan2 == 0) {
                splitnum = GetiNum(i, getcolnum(2), GetOneAbNum(2)) + 1;
                inpid += "2_" + splitnum + "-";
            }
            else if (GetOneAbNum(2) != 0) {
                splitnum = GetiNum(i, getcolnum(2), GetOneAbNum(2)) + 1;
                inpid += "2_" + splitnum + "-";
            }
            if (GetOneAbNum(3) != 0 && rowspan3 == 0) {
                splitnum = GetiNum(i, getcolnum(3), GetOneAbNum(3)) + 1;
                inpid += "3_" + splitnum + "-";
            }
            else if (GetOneAbNum(3) != 0) {
                splitnum = GetiNum(i, getcolnum(3), GetOneAbNum(3)) + 1;
                inpid += "3_" + splitnum + "-";
            }
            if (GetOneAbNum(4) != 0 && rowspan4 == 0) {
                splitnum = GetiNum(i, getcolnum(4), GetOneAbNum(4)) + 1;
                inpid += "4_" + splitnum + "-";
            }
            else if (GetOneAbNum(4) != 0) {
                splitnum = GetiNum(i, getcolnum(4), GetOneAbNum(4)) + 1;
                inpid += "4_" + splitnum + "-";
            }
            if (GetOneAbNum(5) != 0 && rowspan5 == 0) {
                splitnum = GetiNum(i, getcolnum(5), GetOneAbNum(5)) + 1;
                inpid += "5_" + splitnum + "-";
            }
            else if (GetOneAbNum(5) != 0) {
                splitnum = GetiNum(i, getcolnum(5), GetOneAbNum(5)) + 1;
                inpid += "5_" + splitnum + "-";
            }
            inpid = inpid.substr(0, inpid.length - 1);
            rowspan1 = rowspan1 - (rowspan1 == 0 ? 0 : 1);
            rowspan2 = rowspan2 - (rowspan2 == 0 ? 0 : 1);
            rowspan3 = rowspan3 - (rowspan3 == 0 ? 0 : 1);
            rowspan4 = rowspan4 - (rowspan4 == 0 ? 0 : 1);
            rowspan5 = rowspan5 - (rowspan5 == 0 ? 0 : 1);
            price = $('#inp-' + inpid + '-price').val();
            Markprice = $('#inp-' + inpid + '-Markprice').val();
            Kc = $('#inp-' + inpid + '-Kc').val();
            GoodNumsStr=$('#inp-'+inpid+'-GoodsNum').val();
            if (price != "" && Markprice != "" && Kc != "") {
                HiddenFieldKcstr += inpid + "|" + price + "," + Markprice + "," + Kc + ","+GoodNumsStr+";";
                KcNum += parseInt(Kc);
                if (pricenum == 0) {
                    pricenum = parseFloat(price);
                }
                else if (pricenum > parseFloat(price)) {
                    pricenum = parseFloat(price);
                }
                if (Markpricenum == 0) {
                    Markpricenum = parseFloat(Markprice);
                }
                else if (Markpricenum < parseFloat(Markprice)) {
                    Markpricenum = parseFloat(Markprice);
                }
            }
        }
        $('#Fkc').val(KcNum);
        $('#hideFkc').val(KcNum);
        $('#Price').val(Markpricenum);
        $('#NPrice').val(pricenum);
        $('#HiddenPrice').val(Markpricenum);
        $('#HiddenNPrice').val(pricenum);
        HiddenFieldKcstr = HiddenFieldKcstr.substr(0, HiddenFieldKcstr.length - 1);
        $('#Attribute1_HiddenFieldKc').val(HiddenFieldKcstr);
    }
}

//价格数量
function KcNum(obj) {
    var AllAbnum = GetAbNum();
    if (AllAbnum != 0) {
        var KcNum = 0;
        var pricenum = 0;
        var Markpricenum = 0;
        var rowspan1 = 0;
        var rowspan2 = 0;
        var rowspan3 = 0;
        var rowspan4 = 0;
        var rowspan5 = 0;
        var html = "";
        var Cen = getnumofc();
        var price = "";
        var Markprice = "";
        var Kc = "";
        var HiddenFieldKcstr = "";
        var num = 0;
        for (var i = 0; i < AllAbnum; i++) {
            var inpid = "";
            if (GetOneAbNum(1) != 0 && rowspan1 == 0) {
                splitnum = GetiNum(i, getcolnum(1), GetOneAbNum(1)) + 1;
                inpid += "1_" + splitnum + "-";
            }
            else if (GetOneAbNum(1) != 0) {
                splitnum = GetiNum(i, getcolnum(1), GetOneAbNum(1)) + 1;
                inpid += "1_" + splitnum + "-";
            }
            if (GetOneAbNum(2) != 0 && rowspan2 == 0) {
                splitnum = GetiNum(i, getcolnum(2), GetOneAbNum(2)) + 1;
                inpid += "2_" + splitnum + "-";
            }
            else if (GetOneAbNum(2) != 0) {
                splitnum = GetiNum(i, getcolnum(2), GetOneAbNum(2)) + 1;
                inpid += "2_" + splitnum + "-";
            }
            if (GetOneAbNum(3) != 0 && rowspan3 == 0) {
                splitnum = GetiNum(i, getcolnum(3), GetOneAbNum(3)) + 1;
                inpid += "3_" + splitnum + "-";
            }
            else if (GetOneAbNum(3) != 0) {
                splitnum = GetiNum(i, getcolnum(3), GetOneAbNum(3)) + 1;
                inpid += "3_" + splitnum + "-";
            }
            if (GetOneAbNum(4) != 0 && rowspan4 == 0) {
                splitnum = GetiNum(i, getcolnum(4), GetOneAbNum(4)) + 1;
                inpid += "4_" + splitnum + "-";
            }
            else if (GetOneAbNum(4) != 0) {
                splitnum = GetiNum(i, getcolnum(4), GetOneAbNum(4)) + 1;
                inpid += "4_" + splitnum + "-";
            }
            if (GetOneAbNum(5) != 0 && rowspan5 == 0) {
                splitnum = GetiNum(i, getcolnum(5), GetOneAbNum(5)) + 1;
                inpid += "5_" + splitnum + "-";
            }
            else if (GetOneAbNum(5) != 0) {
                splitnum = GetiNum(i, getcolnum(5), GetOneAbNum(5)) + 1;
                inpid += "5_" + splitnum + "-";
            }
            inpid = inpid.substr(0, inpid.length - 1);
            rowspan1 = rowspan1 - (rowspan1 == 0 ? 0 : 1);
            rowspan2 = rowspan2 - (rowspan2 == 0 ? 0 : 1);
            rowspan3 = rowspan3 - (rowspan3 == 0 ? 0 : 1);
            rowspan4 = rowspan4 - (rowspan4 == 0 ? 0 : 1);
            rowspan5 = rowspan5 - (rowspan5 == 0 ? 0 : 1);
            price = $('#inp-' + inpid + '-price').val();
            Markprice = $('#inp-' + inpid + '-Markprice').val();
            Kc = $('#inp-' + inpid + '-Kc').val();
            if (price != "" && Markprice != "" && Kc != "") {
                num++;
            }
        }
        if (num >=100) {
            var mid = obj.id.split('-')[(obj.id.split('-').length - 1)];
            var head = obj.id.replace('-' + mid, '');
            $('#' + head + '-price').val('');
            $('#' + head + '-Markprice').val('');
            $('#' + head + '-Kc').val('');
            alert('不可超过100个库存价格！');
        }
    } 
}

//读取
$(document).ready(function() {
    BindAttri();
    GetAttribute();
    PostKc();
});

//得到属性
function GetAttribute() {
    var HiddenField1 = $('#Attribute1_HiddenField1').val();
    var HiddenField2 = $('#Attribute1_HiddenField2').val();
    var HiddenField3 = $('#Attribute1_HiddenField3').val();
    var HiddenField4 = $('#Attribute1_HiddenField4').val();
    var HiddenField5 = $('#Attribute1_HiddenField5').val();
    var HiddenFieldKc = $('#Attribute1_HiddenFieldKc').val();
    var HiddenFieldValue = $('#Attribute1_HiddenFieldValue').val();
    var HiddenFieldImgStrSrc = $('#Attribute1_HiddenFieldImgStrContrast').val();
    if (HiddenFieldValue != "") {
        Attribute = HiddenFieldValue.split(',').length;
        AttributeValue1 = HiddenField1.split(',').length;
        AttributeValue2 = HiddenField2.split(',').length;
        AttributeValue3 = HiddenField3.split(',').length;
        AttributeValue4 = HiddenField4.split(',').length;
        AttributeValue5 = HiddenField5.split(',').length;
        ViewAbText();
        var html = "";
        var delattributebtn = "";
        for (var i = 1; i <= Attribute; i++) {
            delattributebtn = "";
            if (i == Attribute) {
                delattributebtn = "<input type='button' class='button' id='delAttributebtn' value='删除规格' onclick='DelAttributeNameFun(" + i + ")' style='margin-top: 8px;'/>";
            }
            html += "<div id='AttributeNameDIV" + i + "' class='AttributeDiv' ><p id='pat"+i+"'>规格名：<input id='AttributeName" + i + "' type='text' class='text' onkeyup=PostValue('');ViewAbText(); onblur=if(this.value!=''){if(!CheckAname(this.value," + i + ")){this.value='';}}else{alert('属性名不可为空！');} />" + delattributebtn + "</p>"
                                                    + "<div id='AttributeValueDIV" + i + "' style='width:500px'>"
            for (var j = 1; j <= GetOneAbNum(i); j++) {
                html += "<input id='txtAttributeValue_" + i + "_" + j + "' type='text' class='text' onkeyup='AttributeValueKeyup(this);noSymbol(this)' onblur=if(this.value==''){DelAttributeValueFun(" + i + "," + j + ");}else{if(!CheckAValue(this.value," + j + "," + i + ")){this.value='';}} style='width:80px;margin-top: 8px;' />"
                                                        + "<a href='javascript:void' class='iconfont close' onclick='DelAttributeValueFun(" + i + "," + j + ");AttributeValueKeyup(this);' id='delAttributeValue_" + i + "_" + j + "' >&#xe600;</a>"
            }
            html += "</div><p><input type='button' class='button'  value='添加规格值' onclick='AddAttributeValueFun(" + i + ",GetAttributeValueNameNum(" + i + "));' style='margin-top: 8px;'/></p>"
                                                    + "</div>"
        }
        $('#AttributeHtml').append(html);
        for (var i = 1; i <= Attribute; i++) {
            $('#AttributeName' + i).val(HiddenFieldValue.split(',')[(i - 1)]);
            for (var j = 1; j <= GetOneAbNum(i); j++) {
                $('#txtAttributeValue_' + i + '_' + j).val($('#Attribute1_HiddenField' + i).val().split(',')[(j - 1)]);
            }
        }
        CheckIsHaveAttri();
        Attribute++;
    }
}
//赋值
function fuzhi() {
    var HiddenFieldKc = $('#Attribute1_HiddenFieldKc').val();
    if (HiddenFieldKc != "") {
        var HiddenFieldImgStrSrc = $('#Attribute1_HiddenFieldImgStrContrast').val();
        var HiddenFieldKcarr = HiddenFieldKc.split(';');
        var HiddenFieldKcstr = "";
        var HiddenFieldKcPMKarr = "";
        for (var i = 1; i <= HiddenFieldKcarr.length; i++) {
            HiddenFieldKcstr = HiddenFieldKcarr[(i - 1)].split('|')[0];
            HiddenFieldKcPMKarr = HiddenFieldKcarr[(i - 1)].split('|')[1].split(',');
            $('#inp-' + HiddenFieldKcstr + '-price').val(parseFloat(HiddenFieldKcPMKarr[0]).toFixed(2));
            $('#inp-' + HiddenFieldKcstr + '-Markprice').val(parseFloat(HiddenFieldKcPMKarr[1]).toFixed(2));
            $('#inp-' + HiddenFieldKcstr + '-Kc').val(parseInt(HiddenFieldKcPMKarr[2]));
            $('#inp-' + HiddenFieldKcstr + '-GoodsNum').val(parseInt(HiddenFieldKcPMKarr[3]));
        }
        for (var i = 0; i <= HiddenFieldImgStrSrc.split(',').length; i++) {
            if (HiddenFieldImgStrSrc.split(',')[i] != "" && HiddenFieldImgStrSrc.split(',')[i] != undefined && HiddenFieldImgStrSrc.split(',')[i] != "/UpProductPic/no.gif") {
                $('#fileuploadfont_' + i).empty();
                $('#fileuploadfont_' + i).html("<img src='" + HiddenFieldImgStrSrc.split(',')[i] + "' style='width: 20px; height: 20px; padding-top: 10px;' />");
                $('#fileuploaddel_' + i).show();
            }
            else {
                $('#fileuploaddel_' + i).hide();
            }
        } 
    }
}
//绑定属性
function BindAttri() {
    // var hidelastGetRealAttributestr = $('#hidelastGetRealAttribute').val();
    // if (hidelastGetRealAttributestr != "") {
    //     var hidelastGetRealAttributearr = hidelastGetRealAttributestr.split(';');
    //     var nameid = "";
    //     var valueid = "";
    //     for (var j = 0; j < hidelastGetRealAttributearr.length; j++) {
    //         nameid = hidelastGetRealAttributearr[j].split(':')[0];
    //         valueid = hidelastGetRealAttributearr[j].split(':')[1];
    //         if (document.getElementById("Checkbox_" + nameid + "_" + valueid) != null) {
    //             document.getElementById("Checkbox_" + nameid + "_" + valueid).checked = 1;
    //         }
    //         else if (document.getElementById("sel_" + nameid) != null) {
    //             $("#sel_" + nameid).val(valueid);
    //         }
    //     }
    // }
}

//得到（上面）属性
function GetAtt() {
    if ($('#hideGetRealAttribute').val() != "") {
        var RealAttribute = "";
        var Nameid = "";
        var Valueid = "";
        var GetRealAttribute = $('#hideGetRealAttribute').val().split(',');
        for (var i = 0; i < GetRealAttribute.length; i++) {
            if (GetRealAttribute[i].split('_')[0] == "Checkbox") {
                if (document.getElementById(GetRealAttribute[i]).checked) {
                    Nameid = GetRealAttribute[i].split('_')[1];
                    Valueid = GetRealAttribute[i].split('_')[2];
                    RealAttribute += Nameid + ":" + $('#Font_' + Nameid).html() + ":" + Valueid + ":" + $('#Font_' + Nameid + '_' + Valueid).html() + ";";
                }
            }
            else if (GetRealAttribute[i].split('_')[0] == "sel") {
                Nameid = GetRealAttribute[i].split('_')[1];
                Valueid = $('#' + GetRealAttribute[i]).val();
                RealAttribute += Nameid + ":" + $('#Font_' + Nameid).html() + ":" + Valueid + ":" + $('#' + GetRealAttribute[i]).find("option:selected").text() + ";";
            }
        }
        RealAttribute = RealAttribute.substr(0, RealAttribute.length - 1);
        $('#hideRealAttribute').val(RealAttribute);
    }
}