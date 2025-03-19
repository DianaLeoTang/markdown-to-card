/*
 * @Author: Diana Tang
 * @Date: 2025-03-19 16:57:20
 * @LastEditors: Diana Tang
 * @Description: some description
 * @FilePath: /markdown-to-card/src/app/types.ts
 */
export interface Theme {
  name: string;
  background: string;
  primaryColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  boxShadow: string;
}

export interface ThemeRecord {
  [key: string]: Theme;
}
// types.ts
export interface Theme {
  name: string;
  background: string;
  primaryColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  boxShadow: string;
}