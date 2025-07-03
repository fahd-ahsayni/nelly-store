import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, address, mobile, city, productId, productName, productPrice } = body;

    // Validate required fields
    if (!fullName || !address || !mobile || !city || !productId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Create reservation
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        customer_first_name: fullName.split(" ")[0] || fullName,
        customer_last_name: fullName.split(" ").slice(1).join(" ") || "",
        customer_mobile: mobile,
        customer_secondary_mobile: null,
        customer_address: address,
        customer_city: city,
        items: {
          productId,
          productName,
          productPrice,
          quantity: 1,
        },
        total_amount: productPrice || 0,
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
