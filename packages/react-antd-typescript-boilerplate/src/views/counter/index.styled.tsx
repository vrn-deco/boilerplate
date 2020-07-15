/*
 * @Author: Cphayim
 * @Date: 2020-07-15 15:45:05
 * @LastEditTime: 2020-07-15 17:22:26
 * @Description: 计数器样式组件
 */
import styled from 'styled-components'

export const CounterWrap = styled.div`
  user-select: none;
  overflow: hidden;
  width: 500px;
  border-radius: 30px;
  margin: 100px auto;
  padding: 40px;
  box-shadow: #ccc 5px 5px 20px;
  background-color: #fff;
`

export const Count = styled.div`
  padding: 40px;
  font-size: 120px;
  line-height: 100px;
  color: #666;
  text-align: center;
`

const defaultButtonColor = '#2196F3'
export const CircularButton = styled.div`
  width: 80px;
  line-height: 80px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  background-color: ${(props) => props.color || defaultButtonColor};
  font-size: 40px;
  color: #fff;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
`

export const TextFiled = styled.input`
width:200px;
  margin: 0 20px;
  border: 2px solid #ddd;
  font-size: 40px;
  color: #666;
  text-align: center;
`
