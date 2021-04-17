import { Component, OnInit, Injectable, TestabilityRegistry } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import * as d3 from 'd3';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})

export class BarComponent implements OnInit {

  public items = [];
  constructor(private http: HttpClient) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDNmMjhlZWM4NGQwM2Q3OGUzMTdlMCIsImlhdCI6MTYxODM0NDQ2MywiZXhwIjoxNjIwOTM2NDYzfQ.gzBafEv1o9-K5_oh_X2ddTVjig3SoYWx5AsFa_SeGSE`)
    }

    this.http.get('http://localhost:3000/api/orders/usersgraph', header).toPromise().then(tests => {
      // console.log(tests);

      for (let key in tests) {

        console.log(tests[key]._id);
        var item = {
          "Framework": `${tests[key]._id}`, "Stars": `${tests[key].Stars}`, "Released": "2014"
        }
        console.log(item);
        this.items.push(item);

      }

      this.createSvg();

      console.log(this.items);
      this.drawBars(this.items);



    })

  }

  private data = [

    { "Framework": `${this.items}`, "Stars": "166443", "Released": "2014" },
    { "Framework": "React", "Stars": "150793", "Released": "2013" },
    { "Framework": "Angular", "Stars": "62342", "Released": "2016" },
    { "Framework": "Backbone", "Stars": "27647", "Released": "2010" },
    { "Framework": "Eer", "Stars": "21471", "Released": "2021" },
    { "Framework": "Eber", "Stars": "21471", "Released": "2020" },
    { "Framework": "Ember", "Stars": "21471", "Released": "2012" },
    { "Framework": "Nir", "Stars": "2144471", "Released": "2015" },
    { "Framework": "Nir", "Stars": "2144471", "Released": "2015" },
    { "Framework": "Nir", "Stars": "2144471", "Released": "2015" },
    { "Framework": "Nir", "Stars": "2144471", "Released": "2015" },
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 1);
  private height = 400 - (this.margin * 1);

  ngOnInit(): void {

  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 4))
      .attr("height", this.height + (this.margin * 4))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Add X axis
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.3);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,50)rotate(-45)")
      .style("font-size", "20");

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    this.svg.append("g")
      .call(d3.axisLeft(y));


    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Framework))
      .attr("y", d => y(d.Stars))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.Stars))
      .attr("fill", "#0ff");


  }
}
