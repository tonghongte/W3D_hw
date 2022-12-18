#include <stdio.h>
#include <stdlib.h>  // for atof
#include <math.h>

void collision (double circle_r, double pos_x, double pos_y, double plane_pos_x, double plane_pos_y, double point_on_rectangle_x, double point_on_rectangle_y, double &reverse_x, double &reverse_y, int &ifcollide)
{	
	if (pos_x > 80-(circle_r*10) || pos_x < (circle_r*10)-80){
    reverse_x = -1;
	}
	if (pos_y > 80-(circle_r*10) || pos_y < (circle_r*10)-80){
	reverse_y = -1;
	}
	if (sqrt(pow(point_on_rectangle_x - pos_x, 2) + pow(point_on_rectangle_y - pos_y, 2)) <= circle_r * 10) {
		if (point_on_rectangle_x == plane_pos_x + 20 || point_on_rectangle_x == plane_pos_x - 20) {
		reverse_x = -1;
		}
		if (point_on_rectangle_y == plane_pos_y + 10 || point_on_rectangle_y == plane_pos_y - 10) {
		reverse_y = -1;
		}
		ifcollide=1;
	}
}

int main(int argc, char *argv[]) {
    if ( argc != 8 ) {
    	printf("%d", 0);
		exit (1);
    }else {
		int ifcollide=0;
		double circle_r = atof (argv[1]);
    	double pos_x = atof (argv[2]);
    	double pos_y = atof (argv[3]);
    	double plane_pos_x = atof (argv[4]);
    	double plane_pos_y = atof (argv[5]);
    	double point_on_rectangle_x = atof (argv[6]);
    	double point_on_rectangle_y = atof (argv[7]);
		double reverse_x=1,reverse_y=1;
		collision (circle_r, pos_x, pos_y, plane_pos_x, plane_pos_y, point_on_rectangle_x, point_on_rectangle_y, reverse_x, reverse_y, ifcollide);
        printf("%lf %lf %d", reverse_x, reverse_y, ifcollide);
    }
    exit(0);
}

