/* 
#### Product
-  id
- name
- price
- [OPTIONAL] category
*/

export type Product = {
    id?: string;
    name: string;
    price: number;
    category?: string;
};
