import { model } from "@/types/model";

class Product {
    _id: string;
    assets: model.IAsset[];
    category: string | model.ICategory;
    collections: string[];
    compareAtPrice: number;
    createdAt: string;
    description: string;
    hasSKU: boolean;
    hsnCode: string;
    inventoryQuantity: number;
    isDigitalProduct: boolean;
    maxCompareAtPrice: number;
    maxPrice: number;
    minCompareAtPrice: number;
    minPrice: number;
    minVariant: string | null;
    price: number;
    shippingWeight: model.IShippingWeight;
    sku: string;
    slug: string;
    specification: string;
    status: number;
    tags: string[];
    trackQuantity: boolean;
    title: string;
    updatedAt: string;
    variantSchema: model.IVariantSchema[];
    variants: model.IVariant[];
    neverOutOfStock: boolean;

    constructor(
        _id: string,
        assets: model.IAsset[],
        category: string | model.ICategory,
        collections: string[],
        compareAtPrice: number,
        createdAt: string,
        description: string,
        hasSKU: boolean,
        hsnCode: string,
        inventoryQuantity: number,
        isDigitalProduct: boolean,
        maxCompareAtPrice: number,
        maxPrice: number,
        minCompareAtPrice: number,
        minPrice: number,
        minVariant: string | null,
        price: number,
        shippingWeight: model.IShippingWeight,
        sku: string,
        slug: string,
        specification: string,
        status: number,
        tags: string[],
        trackQuantity: boolean,
        title: string,
        updatedAt: string,
        variantSchema: model.IVariantSchema[],
        variants: model.IVariant[],
        neverOutOfStock: boolean
    ) {
        this._id = _id,
            this.assets = assets,
            this.category = category,
            this.collections = collections,
            this.compareAtPrice = compareAtPrice,
            this.createdAt = createdAt,
            this.description = description,
            this.hasSKU = hasSKU,
            this.hsnCode = hsnCode,
            this.inventoryQuantity = inventoryQuantity,
            this.isDigitalProduct = isDigitalProduct,
            this.maxCompareAtPrice = maxCompareAtPrice,
            this.maxPrice = maxPrice,
            this.minCompareAtPrice = minCompareAtPrice,
            this.minPrice = minPrice,
            this.minVariant = minVariant,
            this.price = price,
            this.shippingWeight = shippingWeight,
            this.sku = sku,
            this.slug = slug,
            this.specification = specification,
            this.status = status,
            this.tags = tags,
            this.trackQuantity = trackQuantity,
            this.title = title,
            this.updatedAt = updatedAt,
            this.variantSchema = variantSchema,
            this.variants = variants,
            this.neverOutOfStock = neverOutOfStock
    }

    hasVariants(): boolean {
        return this.variants.length > 0;
    }

    getVariant(id: string): model.IVariant | undefined {
        return this.variants.find((variant) => variant._id === id);
    }

    getPrice(variantID: string | null) {
        if (variantID) {
            return this.getVariant(variantID)?.price;
        }
        return this.price;
    }

    getDiscountAmount(variantID: string | null): number | null {
        if (variantID) {
            const variant = this.getVariant(variantID);
            if (variant) {
                return variant.compareAtPrice - variant.price;
            } else {
                return null;
            }
        }
        return this.compareAtPrice - this.price;
    }

    getDiscount(variantID: string | null): number | null {
        if (variantID) {
            const variant = this.getVariant(variantID);
            if (variant) {
                return (variant.compareAtPrice - variant.price) / variant.compareAtPrice;
            } else {
                return null;
            }
        }
        return (this.compareAtPrice - this.price) / this.compareAtPrice;
    }

    static fromOBJ(json: any): Product {
        return new Product(
            json._id,
            json.assets,
            json.category,
            json.collections,
            json.compareAtPrice,
            json.createdAt,
            json.description,
            json.hasSKU,
            json.hsnCode,
            json.inventoryQuantity,
            json.isDigitalProduct,
            json.maxCompareAtPrice,
            json.maxPrice,
            json.minCompareAtPrice,
            json.minPrice,
            json.minVariant,
            json.price,
            json.shippingWeight,
            json.sku,
            json.slug,
            json.specification,
            json.status,
            json.tags,
            json.trackQuantity,
            json.title,
            json.updatedAt,
            json.variantSchema,
            json.variants,
            json.neverOutOfStock
        );
    }
}

export { Product }