export interface ApiProps{

name:string,
image:string,
main:{temp:24,temp_min:number,temp_max:number,humidity:number,feels_like:number}
coord:{lon:number}
weather:{description:string}[]


}