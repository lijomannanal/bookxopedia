// app/api/users/route.ts (API Route)
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const genres = await prisma.genre.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
      where: { showOnMenu: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    return NextResponse.json(
      { error: 'Failed to fetch genres' },
      { status: 500 }
    );
  }
}
