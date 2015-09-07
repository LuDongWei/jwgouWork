<%@ WebHandler Language="C#" Class="upload" %>
using System;
using System.Collections.Generic;
using System.Web;
using System.IO;
using Newstart.Util;
using System.Web.SessionState;
using System.Data;

    /// <summary>
    /// upload 的摘要说明
    /// </summary>
    public class upload : IHttpHandler, IRequiresSessionState, IReadOnlySessionState
    {
       
        /// <summary>
        /// 获取配置文件值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        private string GetConfigVal(string key)
        {
            return System.Configuration.ConfigurationManager.AppSettings[key];
        }

        /// <summary>
        /// 获取文件扩展名
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        private string GetFileExtendName(string fileName)
        {
            int position = fileName.LastIndexOf('.');
            return position == -1 ? "" : fileName.Substring(position) ;
        }
        /// <summary>
        /// 按指定配置生成一个图片
        /// </summary>
        /// <param name="sourceFilePath">源图片的物理路径</param>
        /// <param name="chkSize">是否检测图片大小, 如果检测, 当原图尺寸小于要生成的图片大小时, 则忽略, 反之则生成</param>
        /// <param name="config">配置字符串</param>
        /// <param name="newFilePath">生成的图片存放的物理路径</param>
        /// <returns>如果生成了,返回true,反之false</returns>
        private bool GenerateImage(string sourceFilePath, string newFilePath, string config, bool chkSize)
        {
            
            //读配置
            try
            {
                string[] cf = config.Split(',');
                int width = Convert.ToInt32(cf[0]);
                int height = Convert.ToInt32(cf[1]);
                string mode = cf[2];
                if (chkSize)
                {
                    if (ImageUtil.ChkImageSize(sourceFilePath, width, height))
                    {
                        ImageUtil.CreateImage(sourceFilePath, newFilePath, width, height, mode);
                        return true;
                    }
                    return false;
                }
                else
                {
                    ImageUtil.CreateImage(sourceFilePath, newFilePath,width, height,mode);
                    return true;
                }
            }
            catch (Exception)
            {

                return false;
            }  
        }
        public void ProcessRequest(HttpContext context)
        {

            //接收参数
            string path = context.Request.QueryString["path"];
            string fileName = context.Request.QueryString["fileName"];
            string key = context.Request.QueryString["key"];
            int memid = 0;
            string pathnums = path.Split('/')[(path.Split('/').Length - 3)];
            //if (BLLClass.nums(pathnums, "int"))
            //{
            //    memid = Convert.ToInt32(pathnums);
            //}

            //验证参数合法性
            if (string.IsNullOrEmpty(path) || string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(key))
            {
                throw new Exception("不合法的参数值");
            }

            //检查文件
            if (context.Request.Files.Count == 0)
            {
                throw new Exception("没有文件");
            }
            //读取生成配置文件,并拆分, 注意这里不再检测配置字符串的合法性了,这都是我们自己配置的,格式能保证没问题的
            string generateConfig;
            try
            {
                generateConfig = GetConfigVal(key);
                if (string.IsNullOrEmpty(generateConfig))
                {
                    throw new Exception("");
                }
            }
            catch
            {
                throw new Exception("未找到生成图片的配置");
            }
            string[] configArr = generateConfig.Split('|');
            //生成guid
            string guid = Guid.NewGuid().ToString();
            //检测保存目录
            string physicsPath = context.Server.MapPath(path);
            Directory.CreateDirectory(physicsPath);
            //将原始文件保存一下
            HttpPostedFile file = context.Request.Files[0];
            string fileExtendName = GetFileExtendName(file.FileName);
            file.SaveAs(physicsPath + guid + fileExtendName);
            //生成大图
            bool result = GenerateImage(physicsPath + guid + fileExtendName, physicsPath + "L_" + guid + fileExtendName, configArr[0], true);
            //生成中图
            GenerateImage(physicsPath + guid + fileExtendName, physicsPath + "M_" + guid + fileExtendName, configArr[1], false);
            //生成小图
            GenerateImage(physicsPath + guid + fileExtendName, physicsPath + "S_" + guid + fileExtendName, configArr[2], false);
            //返回原图物理文件名,及有无大图
            string haveMaxImg = "0";
            if (result)
            {
                haveMaxImg = "1";
            }
            context.Response.Write(guid + fileExtendName + "|" + haveMaxImg);
            //}
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
