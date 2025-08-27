import type { Dispatch, SetStateAction } from "react"

export interface AuthInputs {
  label: string,
  placeholder?: string,
  name: string,
  type: string
}
export interface AuthProps<T> {
  notification: string,
  title: string,
  description: string,
  inputs: Array<AuthInputs>,
  btn: string,
  data: T
  setData: Dispatch<SetStateAction<T>>,
  notify: Dispatch<SetStateAction<string>>,
  footing: { text: string, link: string, path: string }
}
export interface LogInData {
  email: string,
  password: string
}
export interface SignInData {
  first_name: string,
  last_name: string,
  user_name: string,
  email: string,
  password: string,
  password_confirmation: string,
  profile_image: Blob | null
}
export interface ConfirmationProps {
  text: string,
  close: Dispatch<SetStateAction<boolean>>,
  performFunction: () => void
}
export interface CardProps {
  id: number,
  img: string,
  productName: string,
  productPrice: number,
  requestData: () => {},
  setItems: Dispatch<SetStateAction<Array<GetItemsProps> | null>>
}
export interface GetItemsProps {
  id: number,
  name: string,
  price: number,
  image_url: string
}