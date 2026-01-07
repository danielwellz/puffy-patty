import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Branch, MenuCategory, MenuItem, OrderType } from "../types";

export type CartItem = {
  menuItemId: string;
  nameFa: string;
  nameEn: string;
  price: number;
  qty: number;
  notes?: string;
};

type PwaContextValue = {
  branch: Branch | null;
  setBranch: (branch: Branch | null) => void;
  menu: MenuCategory[];
  setMenu: (menu: MenuCategory[]) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, qty?: number, notes?: string) => void;
  updateCartItem: (menuItemId: string, qty: number) => void;
  updateNotes: (menuItemId: string, notes: string) => void;
  removeFromCart: (menuItemId: string) => void;
  clearCart: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
};

const PwaContext = createContext<PwaContextValue | undefined>(undefined);

const BRANCH_KEY = "puffy-branch";
const CART_KEY = "puffy-cart";
const MENU_CACHE_PREFIX = "puffy-menu-cache:";

export const PwaProvider = ({ children }: { children: React.ReactNode }) => {
  const [branch, setBranchState] = useState<Branch | null>(() => {
    const stored = localStorage.getItem(BRANCH_KEY);
    return stored ? (JSON.parse(stored) as Branch) : null;
  });
  const [menu, setMenuState] = useState<MenuCategory[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  });
  const [orderType, setOrderType] = useState<OrderType>("TAKEAWAY");

  useEffect(() => {
    if (branch) {
      localStorage.setItem(BRANCH_KEY, JSON.stringify(branch));
    } else {
      localStorage.removeItem(BRANCH_KEY);
    }
  }, [branch]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const setBranch = (next: Branch | null) => {
    setBranchState(next);
    setMenuState([]);
    setCart([]);
  };

  const setMenu = (next: MenuCategory[]) => {
    setMenuState(next);
    if (branch) {
      localStorage.setItem(`${MENU_CACHE_PREFIX}${branch.id}`, JSON.stringify(next));
    }
  };

  const addToCart = (item: MenuItem, qty = 1, notes?: string) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.menuItemId === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.menuItemId === item.id
            ? { ...cartItem, qty: cartItem.qty + qty, notes: notes ?? cartItem.notes }
            : cartItem
        );
      }
      return [
        ...prev,
        {
          menuItemId: item.id,
          nameFa: item.nameFa,
          nameEn: item.nameEn,
          price: item.basePrice,
          qty,
          notes
        }
      ];
    });
  };

  const updateCartItem = (menuItemId: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.menuItemId === menuItemId ? { ...item, qty } : item))
    );
  };

  const updateNotes = (menuItemId: string, notes: string) => {
    setCart((prev) =>
      prev.map((item) => (item.menuItemId === menuItemId ? { ...item, notes } : item))
    );
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prev) => prev.filter((item) => item.menuItemId !== menuItemId));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(
    () => ({
      branch,
      setBranch,
      menu,
      setMenu,
      cart,
      addToCart,
      updateCartItem,
      updateNotes,
      removeFromCart,
      clearCart,
      orderType,
      setOrderType
    }),
    [branch, menu, cart, orderType]
  );

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
};

export const usePwa = () => {
  const ctx = useContext(PwaContext);
  if (!ctx) throw new Error("PwaContext missing");
  return ctx;
};

export const loadCachedMenu = (branchId: string) => {
  const cached = localStorage.getItem(`${MENU_CACHE_PREFIX}${branchId}`);
  return cached ? (JSON.parse(cached) as MenuCategory[]) : null;
};
