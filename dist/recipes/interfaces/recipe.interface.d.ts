export interface Recipe {
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
}
export interface RecipeWithNutrition {
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
    nutrition: DownstreamNutritionResponse[];
}
export interface RecipePuppyData {
    title: string;
    version: string;
    href: string;
    results: Recipe[];
}
export interface VeryLongThing {
    foods: DownstreamFullIngredientNutrition[];
}
export interface DownstreamNutritionResponse {
    food_name: string;
    serving_qty: number;
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_cholesterol: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;
    nf_potassium: number;
}
export interface DownstreamFullIngredientNutrition {
    food_name: string;
    brand_name?: any;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_cholesterol: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;
    nf_potassium: number;
    nf_p: number;
    full_nutrients: FullNutrient[];
    nix_brand_name?: any;
    nix_brand_id?: any;
    nix_item_name?: any;
    nix_item_id?: any;
    upc?: any;
    consumed_at: Date;
    metadata: Metadata;
    source: number;
    ndb_no: number;
    tags: Tags;
    alt_measures: AltMeasure[];
    lat?: any;
    lng?: any;
    meal_type: number;
    photo: Photo;
    sub_recipe?: any;
}
export interface FullNutrient {
    attr_id: number;
    value: number;
}
export interface Metadata {
    is_raw_food: boolean;
}
export interface Tags {
    item: string;
    measure?: any;
    quantity: string;
    food_group: number;
    tag_id: number;
}
export interface AltMeasure {
    serving_weight: number;
    measure: string;
    seq?: number;
    qty: number;
}
export interface Photo {
    thumb: string;
    highres: string;
    is_user_uploaded: boolean;
}
