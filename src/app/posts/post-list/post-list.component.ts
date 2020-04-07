import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  posts = [
    {
      title: "Macbook Pro Retina 2017 13 inch",
      content: "My Macbook pro 2017 95% new like",
    },
    {
      title: "Macbook Pro Retina 2018 15 inch",
      content: "My Macbook pro 2018 90%, with some scratch on border (see pic)",
    },
    {
      title: "iPhone XR Max",
      content: "My used iPhone, used for 2 months.",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
