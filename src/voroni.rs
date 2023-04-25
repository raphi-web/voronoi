extern crate voronoi;
use voronoi::{make_polygons, voronoi, Point};

pub fn gen_voronoi(x: &Vec<f64>, y: &Vec<f64>, box_size:f64) -> Vec<Vec<Vec<f64>>> {
    let xmin = x.iter().min_by(|a, b| a.partial_cmp(b).unwrap()).unwrap();
    let xmax = x.iter().max_by(|a, b| a.partial_cmp(b).unwrap()).unwrap();
    let ymin = y.iter().min_by(|a, b| a.partial_cmp(b).unwrap()).unwrap();
    let ymax = y.iter().min_by(|a, b| a.partial_cmp(b).unwrap()).unwrap();

    let points: Vec<Point> = x
        .into_iter()
        .zip(y)
        .map(|(xx, yy)| Point::new(*xx, *yy))
        .collect();
    let diagram = voronoi(points, box_size);

    let polys = make_polygons(&diagram);

    let mut result:Vec<Vec<Vec<f64>>> = vec![];
    for poly in polys.iter() {
        let mut po:Vec<Vec<f64>> = vec![];
        for pnt in poly.iter() {
            let x:f64 = pnt.x.into();
            let y:f64 = pnt.y.into();
            po.push(vec![x,y])
        }
        result.push(po)
    };
    result

}
