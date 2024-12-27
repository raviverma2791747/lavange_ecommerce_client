import { Product } from "@/models";
import { fromJSON } from "postcss";

export namespace model {

    interface IAsset {
        _id: string;
        url: string;
        title: string;
    }

    interface IVariantOption {
        displayName: string;
        value: string;
        status: Status;
    }

    interface IVariantSchema {
        displayName: string;
        name: string;
        type: FacetType;
        options: IVariantOption[];
    }

    interface IVariant {
        _id: string;
        status: Status;
        assets: string[];
        sku: string;
        attributes: Record<string, any>;
        compareAtPrice: number;
        price: number;
        inventoryQuantity: number;
    }

    interface IShippingWeight {
        value: number;
        unit: WeightUnit;
    }

    interface ICategory {
        _id: string;
        asset: string;
        createdAt: string;
        facets: any[]; // Adjust this type based on actual structure of facets
        name: string;
        slug: string;
        status: number;
        updatedAt: string;
        products: any[]; // Adjust this type based on the structure of the products
        id: string;
    }

    interface ICartItem {
        product: Product;
        variant: string | null;
        quantity: number;
        isOutOfStock: boolean;
        _id: string;
    }
}