#include <stdio.h>

struct CauThu
{
    char HoTen[20];
    int BT, SP;
};

int main()
{
    CauThu CT[20];
    int n;

    printf("Nhap so luong cau thu : ");
    scanf("%d", &n);

    for (int i = 1; i <= n; i++) {
        printf("Thong tin cau thu thu %d : ", i);
        printf("Ho ten : ");
        scanf("%d", &CT[i].HoTen);
    }

    printf("\nDanh sach cau thu : ");
    for (int i = 1; i <= n; i++) {
        printf("%d", CT[i].HoTen);
    }
}

