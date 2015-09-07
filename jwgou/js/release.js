/*  经纬购商品发布  by douban
 *  商品名称：jwgName
 *
 *
 */
define(function(require, exports, module) {
    var $ = require("jquery");

    var Handlebars = require("gallery/handlebars/1.0.0/handlebars"),
        tag_1 = Handlebars.compile($("#goods-template-1").html()),
        tag_2 = Handlebars.compile($("#goods-template-2").html());


    //内容填写判断
    function contentJudge() {
        var error = [],
            isReturn = false;

        //判断用户名
        if ($("#jwgName").val() === '') {
            error.push('添加用户名字');
        }


        var Content = CKEDITOR.instances.FCKeditor1.getData();

        if (Content == null || Content.length < 50) {
           error.push('请填写补全您的商品描述，至少50个字符；');
        }   


        //判断必选的商品属性
        $("#proFixed").find(".field").each(function() {
            var this_ = $(this).find('.right');

            if (this_.data('tag') == '2') {
                if (!this_.find("input[name=mCheckbox]").is(':checked')) {
                    error.push('设置完整的商品属性');
                    return false;
                }
            }

        })

        //设置规格和报价
        if ($("#jwgHiddenStandard").val() === '0') {
            if (!$("#Price").val() || !$("#NPrice").val() || !$("#Fkc").val()) {
                error.push('设置完整商品的规格信息');
            }
        } else {
            var mul = 1;
            var allAttri = [$("#Attribute1_HiddenField1"), $("#Attribute1_HiddenField2"), $("#Attribute1_HiddenField3"), $("#Attribute1_HiddenField4"), $("#Attribute1_HiddenField5")];

            for (var d = 0; d < allAttri.length; d++) {
                if (allAttri[d].val()) {
                    mul = mul * allAttri[d].val().split(",").length;

                };
            };

            if ($("#Attribute1_HiddenFieldKc").val()) {
                var size = $("#Attribute1_HiddenFieldKc").val().split(";").length;

                if (size < 1) {
                    error.push('设置完整商品的规格信息');
                }

            } else {
                error.push('设置完整商品的规格信息');
            }
        }


        //设置定时上架
        if ($("#jwg_time_hd").val() === '1') {
            if (!$("#jwgTimeHiddenBegin").val() || !$("#jwgHiddenTimeEnd").val()) {
                error.push('设置完整的定时上架时间');
            }
        }


        if (error.length == 0) {
            setUserProperties();

            //成功可以上传

            isReturn = true;
        } else {
            var html = '<dt><i class="iconfont close"></i>以下宝贝信息填写不正确，请编辑后重新发布：</dt>';

            for (var k = 0; k < error.length; k++) {
                html = html + '<dd>' + (k + 1) + '.' + error[k] + '</dd>';
            };

            $("#jwgError").find("dl").html(html);
            $("#jwgError").show();


            $('html, body').animate({
                scrollTop: $("#jwgError").offset().top
            }, 300);

            isReturn = false;

        }


        return isReturn;
    }






    //>>>>小东西>>>>>>>>>>

    //ajax
    function Ajax(url, data, callback) {
        $.ajax({
            type: "get",
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: data,
            success: function(json) {
                callback && callback(json);
            }
        })
    }

    //计算中文字数
    function countCharacters(str) {
            var totalCount = 0;
            for (var i = 0; i < str.length; i++) {
                var c = str.charCodeAt(i);
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    totalCount++;
                } else {
                    totalCount += 2;
                }
            }
           return totalCount;
    }        

    //name剩下个数
    $("#jwgName").bind({
        keydown: function() {

            var str = $(this).val(),
                len = GetLength(str);

            if (len > 30) {
                $(this).val(GetPartStr(str, 30));
            } else {
                $(this).next('.attetion').find('strong').html(30 - len);
            }
        }
    });

    function GetLength(value) {
        var _tmp = value;
        var _length = 0;
        for (var i = 0; i < _tmp.length; i++) {
            if (_tmp.charCodeAt(i) > 255) {
                _length = _length + 2;
            } else {
                _length++;
            }
        }
        return _length;
    }

    function GetPartStr(value, length) {
        var _length = 0;
        var j = 0;
        for (var i = 0; i < value.length; i++) {
            _length++;
            if (value.charCodeAt(i) > 255) {
                j = j + 2;
            } else {
                j++;
            }
            if (j >= length) {
                break;
            }
        }
        return value.slice(0, _length);
    }

    //商品必选属性
    function reAttribute() {
        var val = $("#attribute_json").val();

        if (val) {
            var json = JSON.parse(val);

            if (json && json.attributelist) {
                proFixedHtml(json.attributelist);
            };

        };

    }

    function proFixedHtml(data_) {
        var html = '';

        for (var i = 0; i < data_.length; i++) {
            if (data_[i]['tag'] === '1') {
                data_[i]['single'] = true;
            } else {
                data_[i]['single'] = false;
            };
        };


        var good = {
            "goods": data_
        }

        html = tag_1(good);

        $("#proFixed").html(html);
    }

    $("body").find("#proFixed").on("change", "input", function() {
        $("#isAttribute_json").val("1");
    })

    $("body").find("#proFixed").on("change", "select", function() {
        $("#isAttribute_json").val("1");
    })

    //自定义属性
    function meAttribute() {
        var val = $("#meAttribute_json").val();
        if (val) {
            var json = JSON.parse(val);
            if (json) {
                customHtml(json);
            }

        }

    }

    function customHtml(json_) {
        console.log(json_)
        var html = '';

        for (var i = 0; i < json_.length; i++) {
            json_[i].number = i;
        };

        var good = {
            "meGoods": json_
        }

        html = tag_2(good);

        $("#customList").html(html);

        customShow();
    }


    $("body").find("#proCustom").on("focus", "input", function() {
        var val = $(this).val(),
            val_ = $(this).data('value');

        if (val == val_) {
            $(this).val('');

            $(this).parent()
        } else if (val == '') {

        }

        customShow();

    }).on("blur", "input", function() {
        var val = $(this).val(),
            val_ = $(this).data('value');

        if (val == val_) {

        } else if (val == '') {
            $(this).val(val_);
        }

        customShow();
    })

    $("body").find("#proCustom").on('change', 'input', function() {
        $("#isMeAttribute_json").val("1");
    })

    //显示提示
    function customShow() {
        $("#proCustom").find("li").each(function() {
            var mm = 0;
            $(this).find("input").each(function() {
                var val = $(this).val(),
                    val_ = $(this).data('value'),
                    this_ = $(this).parent();

                if (val == val_) {
                    this_.find('.verify').find('span').html(val_);
                    this_.find('.verify').show();
                    this_.data('integrity', false);

                    return false
                };

                if (mm == 1 && val != val_) {
                    this_.find('.verify').hide();
                    this_.data('integrity', true);

                }

                mm++
            })
        })
    }


    $("#customAdd").on("click", function() {
        var html = '<li>' + '<div class="node jwgKeyValue  clearfix" data-integrity="false">' + '<input type="text" class="text jwg-key" name="key" value="属性名称"  id="customKey01" data-value="属性名称" >' + '<input type="text" class="text jwg-value" name="value" value="属性内容" id="customValue01" data-value="属性内容" style="margin-left: 6px;" >' + '<i class="iconfont close" style="margin-left:7px;"></i>' + '<span class="verify" style="margin-left:6px;"><span>属性内容</span>不为空</span>' + '</div>' + '</li>';

        $("#proCustom").find("ul").append(html);
    })

    $("body").find("#proCustom").on("click", ".close", function() {
        if ($(".custom-list").find("li").length != 1) {
            $(this).parent().parent().remove();
        }
    })

    //设置商品属性存值
    function setUserProperties() {
        //系统属性保存
        var proFixed = [];
        $("#proFixed").find(".field").find('.right').each(function() {
            var pro = [];

            var AttributeName = $(this).data('value'),
                attributeNameId = $(this).data('id'),
                tag = $(this).data('tag');



            if (tag == '2') {
                $(this).find('input').each(function() {
                    var attr = {
                        AttributeValueId_: '',
                        AttributeValue_: ''
                    }

                    if ($(this).is(':checked')) {
                        var AttributeValueId = parseInt($(this).val(), 10),
                            AttributeValue = $(this).data('value');

                        attr.AttributeValueId_ = AttributeValueId;
                        attr.AttributeValue_ = AttributeValue;

                        pro.push(attr);
                    }

                    /*----20141121-改--*/
                    // var attr = {
                    //     AttributeValueId_: '',
                    //     AttributeValue_: '',
                    //     isChecked:''
                    // }

                    // var AttributeValueId = parseInt($(this).val(), 10),
                    //         AttributeValue = $(this).data('value');

                    // attr.AttributeValueId_ = AttributeValueId;
                    // attr.AttributeValue_ = AttributeValue;

                    // if ($(this).is(':checked')) {
                    //    attr.isChecked=true;
                    // }else{
                    //    attr.isChecked=false; 
                    // }

                    // pro.push(attr);

                })
            } else {
                var this_ = $(this).find("select").find("option:selected"),
                    AttributeValueId = parseInt(this_.val(), 10),
                    AttributeValue = this_.text();

                var attr = {
                    AttributeValueId_: '',
                    AttributeValue_: ''
                }

                attr.AttributeValueId_ = AttributeValueId;
                attr.AttributeValue_ = AttributeValue;

                pro.push(attr);
            }

            var atr = {
                attributeNameId_: attributeNameId,
                AttributeName_: AttributeName,
                pro_: pro
            }

            proFixed.push(atr)

            $("#sysAtuHd").val(JSON.stringify(proFixed));
        })

        //用户自定义属性保存
        var proCustom = [];

        $("#proCustom").find('.jwgKeyValue').each(function() {
            var prc = {
                "attributeNameId_": 0,
                "AttributeName_": "",
                "pro_": [{
                    "AttributeValueId_": "0",
                    "AttributeValue_": ""
                }]
            }
            if ($(this).data("integrity")) {
                var key = $(this).find("input[name=key]").val(),
                    value = $(this).find("input[name=value]").val();

                prc['AttributeName_'] = key;
                prc['pro_'][0]['AttributeValue_'] = value;

                proCustom.push(prc);
            }
        })

        $("#meAtuHd").val(JSON.stringify(proCustom));
    }



    //>>>>>>>>>>自启动>>>>>>>>>>>>>>
    $(function() {
        reAttribute();
        meAttribute();
        $("#jwgSublime").on("click", function() {
            if (!contentJudge()) {
                return false
            }

        })
    })
})