#include <iostream>
#include <vector>

using namespace std;

void regressaoLinear(vector<double> xk, vector<double> yk, vector<double> x2k, vector<double> xkyk, double& a, double& b) {
    int n = xk.size();
    double sum_xk = 0.0;
    double sum_yk = 0.0;
    double sum_x2k = 0.0;
    double sum_xkyk = 0.0;

    for (int i = 0; i < n; i++) {
        sum_xk += xk[i];
        sum_yk += yk[i];
        sum_x2k += x2k[i];
        sum_xkyk += xkyk[i];
    }

    a = (n * sum_xkyk - sum_xk * sum_yk) / (n * sum_x2k - sum_xk * sum_xk); 
    b = (sum_yk - a * sum_xk) / n;
}

int main() {
   
    vector<double> xk = { -1, 0, 1, 2, 3, 4, 5, 6 };
    vector<double> yk = { 10, 9, 7, 5, 4, 3, 0, -1 };
    vector<double> x2k = { 1, 0, 1, 4, 9, 16, 25, 36 };
    vector<double> xkyk = { -10, 0, 7, 10, 12, 12, 0, -6 };

    double a, b;
    regressaoLinear(xk, yk, x2k, xkyk, a, b);

    cout << "A reta de quadrados minimos e: \ny = " << a << "\nx = " << b << endl;

    return 0;
}
