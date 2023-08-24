"use server";

export async function editMetrics(values, id) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...values,
    },
  });

  return user;
}
