import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      firstName, 
      lastName, 
      address, 
      mobile, 
      city, 
      items,
      // Legacy fields for backward compatibility
      productId, 
      productName, 
      productPrice 
    } = body;

    // Validate required fields
    if (!fullName || !address || !mobile || !city) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure items is an array, fallback to legacy format if needed
    let itemsArray = items;
    if (!Array.isArray(items) && productId) {
      // Fallback to legacy single item format
      itemsArray = [{
        productId,
        productName,
        productPrice,
        quantity: 1,
      }];
    }

    if (!itemsArray || !Array.isArray(itemsArray) || itemsArray.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Calculate total amount from items
    const totalAmount = itemsArray.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Create reservation
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        customer_first_name: firstName || fullName.split(" ")[0] || fullName,
        customer_last_name: lastName || fullName.split(" ").slice(1).join(" ") || "",
        customer_mobile: mobile,
        customer_secondary_mobile: null,
        customer_address: address,
        customer_city: city,
        items: itemsArray, // This will now be stored as an array of JSON objects
        total_amount: totalAmount,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating reservation:", error);
      return NextResponse.json(
        { error: "Failed to create reservation" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Reservation created successfully",
        reservation: data 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in reservation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
