import React, {createContext} from 'react'
import AxiosInstance from '../../axiosClient/AxiosInstance';

export const NewsContext = createContext();

export const NewsProvider = (props) =>{
    const {children} = props;
    //get danh sách bài viết
    const getNews = async() =>{
        try {
            const result = await AxiosInstance().get('/product/get-all');
            console.log("req api:",result);
            return result.data.product;
        } catch (error) {
            console.log('getNews Error: ' ,error);
        }
        return [];
    }
    //get infor chi tiết bài viết
    const getDetail = async(id) =>{
        try {
            const response = await AxiosInstance().get(`/product/getProductByID/${id}`);
            console.log("response:",response);
            return response.data.product;
        } catch (error) { 
            console.log('get detail Error: ' ,error);
        }
        return null;
    }
    const getCate = async() =>{
        try {
            const response = await AxiosInstance().get('/product/get-allCategory');
            console.log("response:",response);
        return response.data.cate;
        } catch (error) {
            console.log('getUpload Error: ' ,error);
        }
        return null;
    }

    //Lưu bài viết
    const saveNews = async(title, content, image) =>{
        try {
            const body = {
                title: title,
                content: content,
                image: image,
            }
            console.log(body);
            const response =  await AxiosInstance().post('/articles', body);
            return true;
        } catch (error) {
            console.log('SaveNews: ' , error)
        }
        return false;
    }
    return (
        <NewsContext.Provider 
            value = {{getNews, getDetail,getCate,saveNews}}>
            {children}
        </NewsContext.Provider>
    )
}