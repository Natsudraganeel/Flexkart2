import React from "react"
import "./index.css"

export default function Footer(){
      return <footer class="relative bg-blueGray-200 pt-8 pb-6 ">
      <div class=" mx-auto px-4">
        <div class="flex flex-wrap text-left lg:text-left">
          <div class="w-full lg:w-6/12 px-4">
            <h4 class="text-3xl fonat-semibold text-gray-100">Let's keep in touch!</h4>
            <h5 class="text-lg mt-0 mb-2 text-gray-100">
              Find us on any of these platforms, 
            </h5>
            <div class="mt-6 lg:mb-0 mb-6">
            <a href="https://www.facebook.com/"> <button class=" bro fa fa-facebook"  type="button"></button> </a>
            <a href="https://www.instagram.com/"><button class="bro fa fa-instagram" type="button"></button></a>
            <a href="https://twitter.com/"><button class="bro fa fa-twitter" type="button"></button></a>
            <a href="https://www.linkedin.com/"><button class="bro fa fa-linkedin" type="button"></button></a>
              
              
              
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="flex flex-wrap items-top mb-6">
              <div class="w-full lg:w-4/12 px-4 ml-auto">
                <span class="block uppercase text-gray-100 text-sm font-semibold mb-2">Useful Links</span>
                <ul class="list-unstyled">
                  <li>
                    <a class="text-gray-100 hover:text-blueGray-800 font-semibold block pb-2 text-sm">About Us</a>
                  </li>
                  <li>
                    <a class="text-gray-100 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Blog</a>
                  </li>
                  <li>
                    <a class="text-gray-100 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Github</a>
                  </li>
                  <li>
                    <a class="text-gray-100 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Free Products</a>
                  </li>
                </ul>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <span class="block uppercase text-gray-100 text-sm font-semibold mb-2">Other Resources</span>
                <ul class="list-unstyled">
                  <li>
                    <a class="text-gray-100 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >MIT License</a>
                  </li>
                  <li>
                    <a class="text-gray-100 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a class="text-gray-100 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Privacy Policy</a>
                  </li>
                  <li>
                    <a class="text-gray-100 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-6 border-blueGray-300"/>
        <div class="flex flex-wrap items-center md:justify-between justify-center">
          <div class="w-full md:w-4/12 px-4 mx-auto text-center">
            <div class="text-sm text-gray-100 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span><a  class="text-gray-100 hover:text-gray-800" target="_blank"> </a>
              <a  class="text-gray-100 hover:text-blueGray-800">Flexkart</a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
}