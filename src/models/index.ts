import { model } from "@/types/model";

class ProductModel {
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
    favorite?: boolean;

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
        this._id = _id;
        this.assets = assets;
        this.category = category;
        this.collections = collections;
        this.compareAtPrice = compareAtPrice;
        this.createdAt = createdAt;
        this.description = description;
        this.hasSKU = hasSKU;
        this.hsnCode = hsnCode;
        this.inventoryQuantity = inventoryQuantity;
        this.isDigitalProduct = isDigitalProduct;
        this.maxCompareAtPrice = maxCompareAtPrice;
        this.maxPrice = maxPrice;
        this.minCompareAtPrice = minCompareAtPrice;
        this.minPrice = minPrice;
        this.minVariant = minVariant;
        this.price = price;
        this.shippingWeight = shippingWeight;
        this.sku = sku;
        this.slug = slug;
        this.specification = specification;
        this.status = status;
        this.tags = tags;
        this.trackQuantity = trackQuantity;
        this.title = title;
        this.updatedAt = updatedAt;
        this.variantSchema = variantSchema;
        this.variants = variants;
        this.neverOutOfStock = neverOutOfStock
    }

    hasVariants(): boolean {
        return this.variants.length > 0;
    }

    getVariant(id: string): model.IVariant | null {
        return this.variants.find((variant) => variant._id === id) ?? null;
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

    static fromOBJ(json: Record<string, unknown> | model.IProduct): ProductModel {
        return new ProductModel(
            json._id as string,
            json.assets as model.IAsset[],
            json.category as string | model.ICategory,
            json.collections as string[],
            json.compareAtPrice as number,
            json.createdAt as string,
            json.description as string,
            json.hasSKU as boolean,
            json.hsnCode as string,
            json.inventoryQuantity as number,
            json.isDigitalProduct as boolean,
            json.maxCompareAtPrice as number,
            json.maxPrice as number,
            json.minCompareAtPrice as number,
            json.minPrice as number,
            json.minVariant as string | null,
            json.price as number,
            json.shippingWeight as model.IShippingWeight,
            json.sku as string,
            json.slug as string,
            json.specification as string,
            json.status as number,
            json.tags as string[],
            json.trackQuantity as boolean,
            json.title as string,
            json.updatedAt as string,
            json.variantSchema as model.IVariantSchema[],
            json.variants as model.IVariant[],
            json.neverOutOfStock as boolean
        );
    }
}

class CartItemModel {
    _id: string;
    product: ProductModel;
    quantity: number;
    variant: string | null;
    isOutOfStock: boolean;

    constructor(_id: string, product: ProductModel, quantity: number, variant: string | null, isOutOfStock: boolean) {
        this._id = product._id;
        this.product = product;
        this.quantity = quantity;
        this.variant = variant;
        this.isOutOfStock = isOutOfStock;
    }

    static fromOBJ(json: Record<string, unknown> | model.ICartItem): CartItemModel {
        return new CartItemModel(
            json._id as string,
            ProductModel.fromOBJ(json.product as Record<string, unknown>),
            json.quantity as number,
            json.variant as string | null,
            json.isOutOfStock as boolean
        );
    }
}

class CategoryModel {
    _id: string;
    asset: string | model.IAsset;
    createdAt: string;
    name: string;
    slug: string;
    status: number;
    updatedAt: string;
    products: ProductModel[];

    constructor(_id: string, asset: string | model.IAsset, createdAt: string, name: string, slug: string, status: number, updatedAt: string, products: ProductModel[]) {
        this._id = _id;
        this.asset = asset;
        this.createdAt = createdAt;
        this.name = name;
        this.slug = slug;
        this.status = status;
        this.updatedAt = updatedAt;
        this.products = products;
    }

    static fromOBJ(json: Record<string, unknown> | model.ICategory): CategoryModel {
        return new CategoryModel(
            json._id as string,
            json.asset as string | model.IAsset,
            json.createdAt as string,
            json.name as string,
            json.slug as string,
            json.status as number,
            json.updatedAt as string,
            (json.products as Record<string, unknown>[]).map((product: Record<string, unknown>) => ProductModel.fromOBJ(product))
        );
    }
}

class CollectionModel {
    _id: string;
    asset: model.IAsset;
    createdAt: string;
    description: string;
    name: string;
    slug: string;
    status: number;
    updatedAt: string;
    products: ProductModel[];

    constructor(_id: string, asset: model.IAsset, createdAt: string, description: string, name: string, slug: string, status: number, updatedAt: string, products: ProductModel[]) {
        this._id = _id;
        this.asset = asset;
        this.createdAt = createdAt;
        this.description = description;
        this.name = name;
        this.slug = slug;
        this.status = status;
        this.updatedAt = updatedAt;
        this.products = products;
    }

    static fromOBJ(json: Record<string, unknown> | model.ICollection): CollectionModel {
        return new CollectionModel(
            json._id as string,
            json.asset as model.IAsset,
            json.createdAt as string,
            json.description as string,
            json.name as string,
            json.slug as string,
            json.status as number,
            json.updatedAt as string,
            (json.products as Record<string, unknown>[]).map((product: Record<string, unknown>) => ProductModel.fromOBJ(product))
        );
    }
}

class OrderItemModel {
    product: ProductModel;
    variant: string | null;
    price: number;
    compareAtPrice: number;
    quantity: number;
    _id: string;

    constructor(product: ProductModel, variant: string | null, price: number, compareAtPrice: number, quantity: number, _id: string) {
        this.product = product;
        this.variant = variant;
        this.price = price;
        this.compareAtPrice = compareAtPrice;
        this.quantity = quantity;
        this._id = _id;
    }

    static fromOBJ(json: Record<string, unknown> | model.IOrderItem): OrderItemModel {
        return new OrderItemModel(
            ProductModel.fromOBJ(json.product as Record<string, unknown>),
            json.variant as string | null,
            json.price as number,
            json.compareAtPrice as number,
            json.quantity as number,
            json._id as string
        );
    }
}

class OrderModel {
    _id: string;
    items: OrderItemModel[];
    user: string;
    address: model.IAddress;
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
    timeline: model.ITimelineItem[];
    createdAt: string;
    updatedAt: string;

    constructor(_id: string, items: OrderItemModel[], user: string, address: model.IAddress, status: number, shipping: {
        vendor: string;
        trackingUrl: string;
        price: number;
        trackingId: string;
    }, discount: number, total: number, transactionId: string, paymentStatus: number, paymentMode: number, paymentGateway: number, timeline: model.ITimelineItem[], createdAt: string, updatedAt: string) {
        this._id = _id;
        this.items = items;
        this.user = user;
        this.address = address;
        this.status = status;
        this.shipping = shipping;
        this.discount = discount;
        this.total = total;
        this.transactionId = transactionId;
        this.paymentStatus = paymentStatus;
        this.paymentMode = paymentMode;
        this.paymentGateway = paymentGateway;
        this.timeline = timeline;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromOBJ(json: Record<string, unknown> | model.IOrder): OrderModel {
        return new OrderModel(
            json._id as string,
            (json.items as Record<string, unknown>[]).map((item: Record<string, unknown>) => OrderItemModel.fromOBJ(item)),
            json.user as string,
            json.address as model.IAddress,
            json.status as number,
            json.shipping as {
                vendor: string;
                trackingUrl: string;
                price: number;
                trackingId: string;
            },
            json.discount as number,
            json.total as number,
            json.transactionId as string,
            json.paymentStatus as number,
            json.paymentMode as number,
            json.paymentGateway as number,
            json.timeline as model.ITimelineItem[],
            json.createdAt as string,
            json.updatedAt as string
        );
    }
}

export { ProductModel, CartItemModel, CollectionModel, CategoryModel, OrderItemModel, OrderModel }