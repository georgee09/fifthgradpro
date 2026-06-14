"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Sidebar } from "@/components/ui/sidebar";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inventory: number;
  sold: number;
  description: string;
}

const initialProducts: Product[] = [
  {
    id: "prod-01",
    name: "Nova Smart Speaker",
    category: "Electronics",
    price: 129.0,
    inventory: 38,
    sold: 212,
    description: "A compact home speaker with smart voice controls and premium audio.",
  },
  {
    id: "prod-02",
    name: "Lunar Active Hoodie",
    category: "Apparel",
    price: 68.0,
    inventory: 54,
    sold: 168,
    description: "Soft midweight hoodie built for everyday comfort and performance.",
  },
  {
    id: "prod-03",
    name: "Orbit Wireless Earbuds",
    category: "Electronics",
    price: 98.0,
    inventory: 21,
    sold: 184,
    description: "Noise-aware earbuds with long battery life and rich sound.",
  },
  {
    id: "prod-04",
    name: "Summit Travel Pack",
    category: "Accessories",
    price: 48.0,
    inventory: 74,
    sold: 142,
    description: "Lightweight, durable travel pack for city and weekend adventures.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductsDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [formValues, setFormValues] = useState({
    name: "",
    category: "",
    price: "",
    inventory: "",
    description: "",
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const topProducts = useMemo(
    () => [...products].sort((a, b) => b.sold - a.sold).slice(0, 3),
    [products],
  );

  const totalInventory = useMemo(
    () => products.reduce((sum, product) => sum + product.inventory, 0),
    [products],
  );

  const totalRevenue = useMemo(
    () => products.reduce((sum, product) => sum + product.price * product.sold, 0),
    [products],
  );

  const resetForm = () => {
    setFormValues({
      name: "",
      category: "",
      price: "",
      inventory: "",
      description: "",
    });
  };

  const handleFormChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleAddProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.name.trim() || !formValues.price.trim() || !formValues.inventory.trim()) {
      return;
    }

    const nextProduct: Product = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: formValues.name.trim(),
      category: formValues.category.trim() || "General",
      price: Number(formValues.price),
      inventory: Number(formValues.inventory),
      sold: 0,
      description: formValues.description.trim() || "No additional details.",
    };

    setProducts((current) => [nextProduct, ...current]);
    resetForm();
  };

  const handleOpenEdit = (product: Product) => {
    setEditProduct(product);
    setFormValues({
      name: product.name,
      category: product.category,
      price: String(product.price),
      inventory: String(product.inventory),
      description: product.description,
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editProduct) {
      return;
    }

    const updatedProduct: Product = {
      ...editProduct,
      name: formValues.name.trim() || editProduct.name,
      category: formValues.category.trim() || editProduct.category,
      price: Number(formValues.price) || editProduct.price,
      inventory: Number(formValues.inventory) || editProduct.inventory,
      description: formValues.description.trim() || editProduct.description,
    };

    setProducts((current) =>
      current.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
    setIsEditOpen(false);
    setEditProduct(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setProducts((current) => current.filter((product) => product.id !== id));
    if (editProduct?.id === id) {
      setIsEditOpen(false);
      setEditProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[280px_1fr]">
        <Sidebar className="hidden xl:block" />

        <div className="space-y-8">
          <section className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Product management
            </p>
            <h1 className="text-4xl font-semibold text-white">Manage your product catalog</h1>
            <p className="max-w-3xl text-slate-300">
              Add, update, and delete products while keeping an eye on your most bought
              catalog items.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="space-y-2">
                <CardTitle>{products.length}</CardTitle>
                <CardDescription>Products in catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">All active products available for management.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-2">
                <CardTitle>{totalInventory}</CardTitle>
                <CardDescription>Total inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">Inventory across all products.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-2">
                <CardTitle>{formatCurrency(totalRevenue)}</CardTitle>
                <CardDescription>Potential revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">Revenue if all items sell at current prices.</p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add a new product</CardTitle>
                  <CardDescription>Use the form to create a catalog entry for your store.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Product name"
                        value={formValues.name}
                        onChange={(event) => handleFormChange("name", event.target.value)}
                      />
                      <Input
                        placeholder="Category"
                        value={formValues.category}
                        onChange={(event) => handleFormChange("category", event.target.value)}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Price"
                        type="number"
                        value={formValues.price}
                        onChange={(event) => handleFormChange("price", event.target.value)}
                      />
                      <Input
                        placeholder="Inventory"
                        type="number"
                        value={formValues.inventory}
                        onChange={(event) => handleFormChange("inventory", event.target.value)}
                      />
                    </div>

                    <TextArea
                      placeholder="Product description"
                      value={formValues.description}
                      onChange={(event) => handleFormChange("description", event.target.value)}
                    />

                    <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                      <Button type="submit">Add product</Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product catalog</CardTitle>
                  <CardDescription>Review all products and take action.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="w-full min-w-max border-collapse text-left text-sm">
                    <thead className="border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="px-4 py-3 font-medium">Product</th>
                        <th className="px-4 py-3 font-medium">Category</th>
                        <th className="px-4 py-3 font-medium">Price</th>
                        <th className="px-4 py-3 font-medium">Inventory</th>
                        <th className="px-4 py-3 font-medium">Sold</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-slate-800 text-slate-300 hover:bg-slate-950/80">
                          <td className="px-4 py-3">{product.name}</td>
                          <td className="px-4 py-3">{product.category}</td>
                          <td className="px-4 py-3">{formatCurrency(product.price)}</td>
                          <td className="px-4 py-3">{product.inventory}</td>
                          <td className="px-4 py-3">{product.sold}</td>
                          <td className="px-4 py-3 space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenEdit(product)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most bought</CardTitle>
                  <CardDescription>Top-selling products by quantity sold.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-400">{product.category}</p>
                          <p className="text-xl font-semibold text-white">{product.name}</p>
                        </div>
                        <p className="text-lg font-semibold text-slate-100">{product.sold}</p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{product.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Management notes</CardTitle>
                  <CardDescription>Keep product details up to date.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-400">
                  <p>Update inventory counts when stock changes.</p>
                  <p>Review pricing before launching new campaigns.</p>
                  <p>Track sold quantities to promote best sellers.</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
            <DialogDescription>Change product details and save updates.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Product name"
                value={formValues.name}
                onChange={(event) => handleFormChange("name", event.target.value)}
              />
              <Input
                placeholder="Category"
                value={formValues.category}
                onChange={(event) => handleFormChange("category", event.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Price"
                type="number"
                value={formValues.price}
                onChange={(event) => handleFormChange("price", event.target.value)}
              />
              <Input
                placeholder="Inventory"
                type="number"
                value={formValues.inventory}
                onChange={(event) => handleFormChange("inventory", event.target.value)}
              />
            </div>
            <TextArea
              placeholder="Product description"
              value={formValues.description}
              onChange={(event) => handleFormChange("description", event.target.value)}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditProduct(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
