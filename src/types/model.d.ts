export namespace model {

    export interface IProduct {
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
    }

    export interface IUser {
        _id: string;
        status: number;
        username: string;
        isVerified: boolean;
        email: string;
        firstName: string;
        lastName: string;
        role: IRole;
        wishList: string[];
        cart: ICartItem[];
        addresses: IAddress[];
        createdAt: string;
        updatedAt: string;
    }

    export interface IRole {
        _id: string;
        name: string;
        rights: number[];
        createdAt: string;
        updatedAt: string;
    }

    export interface IAsset {
        _id: string;
        url: string;
        title: string;
    }

    export interface IVariantOption {
        displayName: string;
        value: string;
        status: Status;
    }

    export interface IVariantSchema {
        displayName: string;
        name: string;
        type: FacetType;
        options: IVariantOption[];
    }

    export interface IVariant {
        _id: string;
        status: Status;
        assets: string[];
        sku: string;
        attributes: Record<string, unkown>;
        compareAtPrice: number;
        price: number;
        inventoryQuantity: number;
    }

    export interface IShippingWeight {
        value: number;
        unit: WeightUnit;
    }

    export interface ICategory {
        _id: string;
        asset: string;
        createdAt: string;
        facets: unkown[]; // Adjust this type based on actual structure of facets
        name: string;
        slug: string;
        status: number;
        updatedAt: string;
        products: IProduct[]; // Adjust this type based on the structure of the products
        id: string;
    }

    export interface ICollection {
        _id: string;
        asset: IAsset;
        createdAt: string;
        description: string;
        name: string;
        slug: string;
        status: number;
        updatedAt: string;
        products: IProduct[]; // Adjust this type based on the structure of the products
    }

    export interface IAnnouncement {
        _id: string;
        asset: IAsset;
        createdAt: string;
        ctaUrl: string;
        status: number;
        title: string;
        updatedAt: string;
    }

    export interface ICartItem {
        product: IProduct | string;
        variant: string | null;
        quantity: number;
        isOutOfStock: boolean;
        _id: string;
    }

    export interface IAddress {
        status: number;
        _id: string;
        default: boolean;
        fullName: string;
        mobile: number;
        addressLine1: string;
        addressLine2: string;
        landmark: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
        type: number;
    }

    export interface IHomeConfig {
        _id: string;
        name: string;
        status: number;
        type: number;
        featuredCategories: model.ICategory[];
        featuredAnnouncements: model.IAnnouncement[];
        featuredCollections: model.ICollection[];
        newArrivalProducts: IProduct[];
        bestSellerProducts: IProduct[];
        exploreProducts: IProduct[];
        exploreCollections: model.ICollection[];
        createdAt: string;
        updatedAt: string;
    }

    export interface IOrderItem {
        product: IProduct;
        variant: string | null;
        price: number;
        compareAtPrice: number;
        quantity: number;
        _id: string;
    }

    export interface ITimelineItem {
        status: number;
        _id: string;
        message: string;
        updatedAt: string;
    }

    export interface IOrder {
        _id: string;
        items: IOrderItem[];
        user: string;
        address: IAddress;
        status: number;
        shipping: {
            vendor: string;
            trackingUrl: string;
            price: number;
            trackingId: string;
        };
        discount: number;
        total: number;
        transactionId: string;
        paymentStatus: number;
        paymentMode: number;
        paymentGateway: number;
        timeline: ITimelineItem[];
        createdAt: string;
        updatedAt: string;
    }

    export interface IPolicy {
        _id: string;
        name: string;
        status: number;
        type: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface IFaq {
        _id: string;
        question: string;
        answer: string;
    }

    export interface ITopic {
        _id: string;
        title: string;
        faqs: IFaq[];
    }

    export interface IHelpConfig {
        _id: string;
        name: string;
        status: number;
        type: string;
        topics: ITopic[];
        createdAt: string;
        updatedAt: string;
    }

    export interface IPaymentGateway { name: string, code: number, status: boolean, _id: string }
}